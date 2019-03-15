import { RETRIEVE_MONIT } from '../actions/monitoramento';

export default function monit(state = null, action) {
  switch (action.type) {
    case RETRIEVE_MONIT:
      return {
        ...state,
        monit: [...action.monit]
      }
    default:
      return state
  }
}