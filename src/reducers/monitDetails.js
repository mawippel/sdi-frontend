import { RETRIEVE_MONIT_DETAILS } from '../actions/monitDetails';

export default function monit(state = null, action) {
  switch (action.type) {
    case RETRIEVE_MONIT_DETAILS:
      return {
        ...state,
        ...action.monitDetails
      }
    default:
      return state
  }
}