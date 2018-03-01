import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

class ProductDetails extends PureComponent {
  render() {
    const {product} = this.props
    return (
      <div>
        <h1>{ product.name }</h1>
      </div>
    )
  }
}

export default ProductDetails
