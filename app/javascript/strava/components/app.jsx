import React from 'react';
import { Link } from 'react-router-dom';
import { ActivityList } from '../containers/activity_list';
import ActivityMap from '../containers/activity_map';

const App = () => {
  return (
    <div>
      <Link to={`/connect_friends`}>
        <div className='btn btn-primary find-friends'>
          Find and connect to your friends!
        </div>
      </Link>
      <div className="app">
        <ActivityList />
        <div className="map-panel">
          <ActivityMap />
        </div>
      </div>
    </div>
  );
};

export default App;
