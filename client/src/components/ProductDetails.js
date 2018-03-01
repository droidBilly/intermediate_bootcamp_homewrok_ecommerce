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

const mapStateToProps = function (state) {
  return {
    product: state.products.find(product => product.id === 7)
  }
}

export default connect(mapStateToProps)(ProductDetails)
