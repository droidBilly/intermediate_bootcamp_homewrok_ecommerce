import {FETCHED_ALL_PRODUCTS} from '../actions/fetchProducts'

export default function (state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_PRODUCTS:
      return action.payload
    default:
      return state
  }
}
