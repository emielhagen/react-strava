import React from 'react';
import { Link } from 'react-router-dom';
import { ActivityList } from '../containers/activity_list';
import ActivityMap from '../containers/activity_map';

const App = (props) => {
  const user_id = props.match.params.user
  return (
    <div className="app">
      <ActivityList user_id={user_id} />
      <div className="map-panel">
        <ActivityMap />
      </div>
    </div>
  );
};

export default App;
