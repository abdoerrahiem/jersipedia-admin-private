import { GET_ORDERS, UPDATE_ORDER, CLEAR_ORDER_STATE } from '../types'

const initialState = {
  getOrdersLoading: false,
  getOrdersSuccess: null,
  getOrdersFail: null,

  updateOrderLoading: false,
  updateOrdersuccess: null,
  updateOrderFail: null,
}

export default function orderReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        getOrdersLoading: payload.loading,
        getOrdersSuccess: payload.data,
        getOrdersFail: payload.error,
      }
    case UPDATE_ORDER:
      return {
        ...state,
        updateOrderLoading: payload.loading,
        updateOrderSuccess: payload.data,
        updateOrderFail: payload.error,
      }
    case CLEAR_ORDER_STATE:
      return {
        getOrdersLoading: false,
        getOrdersSuccess: null,
        getOrdersFail: null,

        updateOrderLoading: false,
        updateOrdersuccess: null,
        updateOrderFail: null,
      }
    default:
      return state
  }
}
