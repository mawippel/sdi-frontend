import * as api from '../api/SdiApi'

export const RETRIEVE_MONIT = 'RETRIEVE_MONIT'

function retrieveMonit(monit) {
  return {
    type: RETRIEVE_MONIT,
    monit
  }
}

export const handleRetrieveMonit = () => {
  return dispatch => {
    return api.listAllMonit().then(monit => dispatch(retrieveMonit(monit)))
  }
}