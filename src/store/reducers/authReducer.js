import { LOGIN, CHECK_LOGIN, LOGOUT } from '../types'

const initialState = {
  user: null,

  loginLoading: false,
  loginSuccess: null,
  loginFail: null,

  checkLoginLoading: false,
  checkLoginSuccess: null,
  checkLoginFail: null,
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case LOGIN:
      return {
        ...state,
        loginLoading: payload.loading,
        loginSuccess: payload.data,
        loginFail: payload.error,
        user: payload.data,
      }
    case CHECK_LOGIN:
      return {
        ...state,
        checkLoginLoading: payload.loading,
        checkLoginSuccess: payload.data,
        checkLoginFail: payload.error,
        user: payload.data,
      }
    case LOGOUT:
      return {
        user: null,
        loginLoading: false,
        loginSuccess: null,
        loginFail: null,
        checkLoginLoading: false,
        checkLoginSuccess: null,
        checkLoginFail: null,
      }
    default:
      return state
  }
}
