export const SELECT_ACTIVITY = 'SELECT_ACTIVITY';
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';


export function fetchActivities() {
  const promise = fetch('/api/v1/activities', { credentials: "same-origin" })
    .then(response => response.json());
  return {
    type: FETCH_ACTIVITIES,
    payload: promise
  }
}

export function selectActivity(activity) {
  return {
    type: SELECT_ACTIVITY,
    payload: activity
  }
}
