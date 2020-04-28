import { FETCH_USERS } from '../actions/index';

export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}
