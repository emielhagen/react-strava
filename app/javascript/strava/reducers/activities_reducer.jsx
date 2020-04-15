import { FETCH_ACTIVITIES } from '../actions/index';

export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
}
