import { RETRIEVE_CONFIG } from '../actions/config'

export default function config(state = null, action) {
  switch (action.type) {
    case RETRIEVE_CONFIG:
      return {
        ...state,
        ...action.config
      }
    default:
      return state
  }
}