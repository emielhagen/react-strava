import { FETCH_FRIENDS } from '../actions/index';

export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case FETCH_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}
