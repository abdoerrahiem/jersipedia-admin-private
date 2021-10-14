import { combineReducers } from 'redux'
import authReducer from './authReducer'
import jerseyReducer from './jerseyReducer'
import leagueReducer from './leagueReducer'
import orderReducer from './orderReducer'

const reducers = combineReducers({
  authReducer,
  jerseyReducer,
  leagueReducer,
  orderReducer,
})

export default reducers
