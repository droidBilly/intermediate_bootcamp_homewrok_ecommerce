import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ProductDetails extends PureComponent {
  render() {
    const {product} = this.props
    return (
      <div>
        <h1>{ product.name }</h1>
        <p> Price: {product.price} €</p>
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    product: state.products.find(p => p.id === Number(props.match.params.id))
  }
}

export default connect(mapStateToProps)(ProductDetails)
