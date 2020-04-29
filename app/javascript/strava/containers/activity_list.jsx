import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../actions/index';

import Activity from './activity';

export const ActivityList = (props) => {
  const dispatch = useDispatch();
  const { activities } = useSelector(state => ({ activities: state.activities }))

  useEffect(() => {
    dispatch(fetchActivities(props.user_id ? props.user_id : ''));
  }, [activities.length])

  return(
    <div className="activity-list">
      {activities.map(act => <Activity activity={act} key={act.strava_activity_id} allow_edit={props.user_id ? false : true} /> )}
    </div>
  )
}
