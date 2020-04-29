import { FETCH_USERS, FIND_USERS } from '../actions/index';

export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case FIND_USERS:
      const userFound = state.find(usr => usr.username === action.payload);
      if(userFound) {
        return [userFound];
      } else {
        return [];
      }
    default:
      return state;
  }
}
