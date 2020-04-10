import { SELECT_ACTIVITY } from '../actions/index';

export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case SELECT_ACTIVITY:
      return action.payload;
    default:
      return state;
  }
}
