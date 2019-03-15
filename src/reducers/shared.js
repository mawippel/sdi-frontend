import { combineReducers } from 'redux'
import config from './config'
import monit from './monitoramento'
import monitTimer from './monitTimer'
import monitDetails from './monitDetails'

export default combineReducers({
  config,
  monit,
  monitTimer,
  monitDetails
})