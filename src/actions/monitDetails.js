import * as api from '../api/SdiApi'

export const RETRIEVE_MONIT_DETAILS = 'RETRIEVE_MONIT_DETAILS'

function retrieveMonitDetails(monitDetails) {
  return {
    type: RETRIEVE_MONIT_DETAILS,
    monitDetails
  }
}

export const handleRetrieveMonitDetails = (idMonit) => {
  return dispatch => {
    return api.listAllMonitDetails(idMonit).then(monitDetails => dispatch(retrieveMonitDetails(monitDetails)))
  }
}