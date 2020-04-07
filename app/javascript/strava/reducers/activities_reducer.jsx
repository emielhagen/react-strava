export default function(state, action) {
  if(state === undefined) {
    return [];
  }
  switch (action.type) {
    case 'ACTIVITY_POSTED':
      return state;
    default:
      return state;
  }
}
