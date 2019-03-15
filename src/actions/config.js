import * as api from '../api/SdiApi'

export const RETRIEVE_CONFIG = 'RETRIEVE_CONFIG'

function retrieveConfig(config) {
  return {
    type: RETRIEVE_CONFIG,
    config
  }
}

export const handleRetrieveConfig = () => {
  return dispatch => {
    return api.getConfig().then(config => dispatch(retrieveConfig(config)))
  }
}