import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import ConnectApp from './components/connect_app';

import activitiesReducer from './reducers/activities_reducer';
import selectedActivityReducer from './reducers/selected_activity_reducer';
import friendsReducer from './reducers/friends_reducer';
import usersReducer from './reducers/users_reducer';
import incomingRequestsReducer from './reducers/incoming_requests_reducer';

const stravaContainer = document.getElementById('strava_app');

const reducers = combineReducers({
  activities: activitiesReducer,
  selectedActivity: selectedActivityReducer,
  friends: friendsReducer,
  users: usersReducer,
  incomingRequests: incomingRequestsReducer
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, {}, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/activities" exact component={App} />
        <Route path="/connect_friends" exact component={ConnectApp} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  stravaContainer
);
