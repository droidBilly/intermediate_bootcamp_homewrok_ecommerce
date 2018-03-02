import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchProduct } from '../actions/fetchProducts'

class ProductDetails extends PureComponent {

  componentWillMount(props) {
    this.props.fetchProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    if (!product) return null

    return (
      <div>
        <h1>{ product.name }</h1>
        <p>Price: {product.price} €</p>
        <p>{product.description}</p>
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps, {fetchProduct})(ProductDetails)
