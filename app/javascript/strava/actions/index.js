export const SELECT_ACTIVITY = 'SELECT_ACTIVITY';
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_INCOMING_REQUESTS = 'FETCH_INCOMING_REQUESTS';

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

export function fetchFriends() {
  const promise = fetch(`/api/v1/users?type=friends`, { credentials: "same-origin" })
    .then(response => response.json());

  return {
    type: FETCH_FRIENDS,
    payload: promise
  }
}

export function fetchIncomingRequests() {
  const promise = fetch(`/api/v1/users?type=incoming_requests`, { credentials: "same-origin" })
    .then(response => response.json());

  return {
    type: FETCH_INCOMING_REQUESTS,
    payload: promise
  }
}

export function fetchUsers() {
  const promise = fetch(`/api/v1/users`, { credentials: "same-origin" })
    .then(response => response.json());

  return {
    type: FETCH_USERS,
    payload: promise
  }
}

export function connectFriend(id, request) {
  const body = { user: { id: id, request: request } };
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const promise = fetch(`api/v1/users/${id}`, {
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
    type: FETCH_USERS,
    payload: promise
  }
}
