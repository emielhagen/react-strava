import React from 'react';
import ActivityList from '../containers/activity_list';
import ActivityMap from '../containers/activity_map';

const App = (props) => {
  return (
    <div className="app">
      <ActivityList />
      <div className="map-panel">
        <ActivityMap />
      </div>
    </div>
  );
};

export default App;
