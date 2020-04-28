import { FETCH_INCOMING_REQUESTS } from '../actions/index';

export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case FETCH_INCOMING_REQUESTS:
      return action.payload;
    default:
      return state;
  }
}
