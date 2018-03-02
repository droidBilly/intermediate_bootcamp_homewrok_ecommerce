import {FETCHED_DETAILED_PRODUCT} from '../actions/fetchProducts'
import {ADD_PRODUCT} from '../actions/fetchProducts'
import {REMOVE_PRODUCT} from '../actions/fetchProducts'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_PRODUCT:
      return action.payload
    case ADD_PRODUCT:
      return [...state, action.payload]
    case REMOVE_PRODUCT:
      return state
    default:
      return state
  }
}
