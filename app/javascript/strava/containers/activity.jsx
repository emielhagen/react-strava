import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectActivity } from '../actions/index';

class Activity extends Component {
  cardImage(type) {
    switch(type) {
      case 'Run':
        return 'https://thumbs.dreamstime.com/b/running-man-sport-run-active-fitness-exercise-athlete-variety-sport-movements-hipsters-flat-cartoon-style-side-view-running-150508966.jpg';
      case 'Ride':
        return 'https://cdn.clipart.email/f8443b8a49fd7de5265aeb9c53f21d32_a-man-riding-a-mountain-bike-cartoon-clipart-vector-_809-1024.jpeg';
      case 'Swim':
        return "https://cdn.friendlystock.com/wp-content/uploads/2018/07/1-man-swimming-in-the-water-cartoon-clipart.jpg";
      default:
        return "https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/skateboard.jpg";
    }
  }

  handleClick = () => {
    this.props.selectActivity(this.props.activity);
  }

  render() {
    const { activity } = this.props
    return(
      <div className="card-product" onClick={this.handleClick}>
        <img src={this.cardImage(activity.activity_type)}/>
        <div className="card-product-infos">
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
          <div className="activity-stats">
            <p>{activity.distance} km</p>
            <p>{activity.moving_time/60} minutes</p>
            <p>{activity.average_heart_rate} avg heartrate</p>
            <p>{activity.max_heart_rate} max heartrate</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectActivity }, dispatch);
}

export default connect(null, mapDispatchToProps)(Activity);

