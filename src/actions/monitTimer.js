import * as api from '../api/SdiApi'

export const RETRIEVE_MONIT_TIMER = 'RETRIEVE_MONIT_TIMER'

function retrieveMonitTimer(monitTimer) {
  return {
    type: RETRIEVE_MONIT_TIMER,
    monitTimer
  }
}

export const handleRetrieveMonitTimer = () => {
  return dispatch => {
    return api.listAllMonitTimer().then(monitTimer => dispatch(retrieveMonitTimer(monitTimer)))
  }
}