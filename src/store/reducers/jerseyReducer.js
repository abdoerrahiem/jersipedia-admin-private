import {
  GET_JERSEYS,
  GET_JERSEY,
  UPLOAD_JERSEY,
  CLEAR_UPLOAD_JERSEY,
  ADD_JERSEY,
  UPDATE_JERSEY,
  DELETE_JERSEY,
  CLEAR_JERSEY_STATE,
} from '../types'

const initialState = {
  getJerseysLoading: false,
  getJerseysSuccess: null,
  getJerseysFail: null,

  getJerseyLoading: false,
  getJerseySuccess: null,
  getJerseyFail: null,

  uploadJerseyLoading: false,
  uploadJerseySuccess: null,
  uploadJerseyFail: null,

  addJerseyJerseyLoading: false,
  addJerseyJerseySuccess: null,
  addJerseyJerseyFail: null,

  updateJerseyLoading: false,
  updateJerseySuccess: null,
  updateJerseyFail: null,

  deleteJerseyLoading: false,
  deleteJerseySuccess: null,
  deleteJerseyFail: null,
}

export default function jerseyReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_JERSEYS:
      return {
        ...state,
        getJerseysLoading: payload.loading,
        getJerseysSuccess: payload.data,
        getJerseysFail: payload.error,
      }
    case GET_JERSEY:
      return {
        ...state,
        getJerseyLoading: payload.loading,
        getJerseySuccess: payload.data,
        getJerseyFail: payload.error,
      }
    case UPLOAD_JERSEY:
      return {
        ...state,
        uploadJerseyLoading: payload.loading,
        uploadJerseySuccess: payload.data,
        uploadJerseyFail: payload.error,
      }
    case CLEAR_UPLOAD_JERSEY:
      return {
        ...state,
        uploadJerseyLoading: null,
        uploadJerseySuccess: null,
        uploadJerseyFail: null,
      }
    case ADD_JERSEY:
      return {
        ...state,
        addJerseyLoading: payload.loading,
        addJerseySuccess: payload.data,
        addJerseyFail: payload.error,
      }
    case UPDATE_JERSEY:
      return {
        ...state,
        updateJerseyLoading: payload.loading,
        updateJerseySuccess: payload.data,
        updateJerseyFail: payload.error,
      }
    case DELETE_JERSEY:
      return {
        ...state,
        deleteJerseyLoading: payload.loading,
        deleteJerseySuccess: payload.data,
        deleteJerseyFail: payload.error,
      }
    case CLEAR_JERSEY_STATE:
      return {
        getJerseysLoading: false,
        getJerseysSuccess: null,
        getJerseysFail: null,

        getJerseyLoading: false,
        getJerseySuccess: null,
        getJerseyFail: null,

        uploadJerseyLoading: false,
        uploadJerseySuccess: null,
        uploadJerseyFail: null,

        addJerseyJerseyLoading: false,
        addJerseyJerseySuccess: null,
        addJerseyJerseyFail: null,

        updateJerseyLoading: false,
        updateJerseySuccess: null,
        updateJerseyFail: null,

        deleteJerseyLoading: false,
        deleteJerseySuccess: null,
        deleteJerseyFail: null,
      }
    default:
      return state
  }
}
