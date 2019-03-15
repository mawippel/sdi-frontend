import { RETRIEVE_MONIT_TIMER } from '../actions/monitTimer';

export default function monit(state = null, action) {
  switch (action.type) {
    case RETRIEVE_MONIT_TIMER:
      return {
        ...state,
        monitTimer: [...action.monitTimer]
      }
    default:
      return state
  }
}