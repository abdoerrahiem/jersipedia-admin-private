import {
  GET_LEAGUES,
  GET_LEAGUE,
  ADD_LEAGUE,
  UPDATE_LEAGUE,
  DELETE_LEAGUE,
  CLEAR_LEAGUE_STATE,
} from '../types'

const initialState = {
  getLeaguesLoading: false,
  getLeaguesSuccess: null,
  getLeaguesFail: null,

  getLeagueLoading: false,
  getLeagueSuccess: null,
  getLeagueFail: null,

  addLeagueLoading: false,
  addLeagueSuccess: null,
  addLeagueFail: null,

  updateLeagueLoading: false,
  updateLeagueSuccess: null,
  updateLeagueFail: null,

  deleteLeagueLoading: false,
  deleteLeagueSuccess: null,
  deleteLeagueFail: null,
}

export default function leagueReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_LEAGUES:
      return {
        ...state,
        getLeaguesLoading: payload.loading,
        getLeaguesSuccess: payload.data,
        getLeaguesFail: payload.error,
      }
    case GET_LEAGUE:
      return {
        ...state,
        getLeagueLoading: payload.loading,
        getLeagueSuccess: payload.data,
        getLeagueFail: payload.error,
      }
    case ADD_LEAGUE:
      return {
        ...state,
        addLeagueLoading: payload.loading,
        addLeagueSuccess: payload.data,
        addLeagueFail: payload.error,
      }
    case UPDATE_LEAGUE:
      return {
        ...state,
        updateLeagueLoading: payload.loading,
        updateLeagueSuccess: payload.data,
        updateLeagueFail: payload.error,
      }
    case DELETE_LEAGUE:
      return {
        ...state,
        deleteLeagueLoading: payload.loading,
        deleteLeagueSuccess: payload.data,
        deleteLeagueFail: payload.error,
      }
    case CLEAR_LEAGUE_STATE:
      return {
        getLeaguesLoading: false,
        getLeaguesSuccess: null,
        getLeaguesFail: null,

        getLeagueLoading: false,
        getLeagueSuccess: null,
        getLeagueFail: null,

        addLeagueLoading: false,
        addLeagueSuccess: null,
        addLeagueFail: null,

        updateLeagueLoading: false,
        updateLeagueSuccess: null,
        updateLeagueFail: null,

        deleteLeagueLoading: false,
        deleteLeagueSuccess: null,
        deleteLeagueFail: null,
      }
    default:
      return state
  }
}
