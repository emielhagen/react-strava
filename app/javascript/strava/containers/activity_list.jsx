import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchActivities } from '../actions/index';

import Activity from './activity';

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchActivities()
  }

  render() {
    return(
      <div className="activity-list">
        {this.props.activities.map(act => <Activity activity={act} key={act.name} /> )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchActivities }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
