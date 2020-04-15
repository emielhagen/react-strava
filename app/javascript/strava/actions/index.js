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

export function submitActivity(activity, form) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const body = { activity: { name: form[0].value, description: form[1].value } };

  const promise = fetch(`/api/v1/activities/${activity.id}`, {
    method: 'PATCH',
    headers: {
      'X-CSRF-Token': csrfToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "same-origin",
    body: JSON.stringify(body)
  }).then(response => response.json());

  return {
    type: FETCH_ACTIVITIES,
    payload: promise
  }
}
