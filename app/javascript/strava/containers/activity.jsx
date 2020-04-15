import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectActivity } from '../actions/index';
import ActivityForm from './activity_form';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }

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

  timeConvert(activity) {
    const totalMinutes = activity.moving_time/60;
    const hours = Math.floor(totalMinutes/60);
    const remainingMinutes = Math.floor((totalMinutes-hours*60).toFixed(2));

    if(totalMinutes>60) {
      return `${hours}H ${remainingMinutes}M`;
    } else {
      return `${remainingMinutes}M`;
    }
  }

  meterConvert(activity) {
    const secondsPerKm = 1/activity.average_speed*1000;
    const minutes = Math.floor(secondsPerKm/60);
    const remainingSeconds = Math.floor((secondsPerKm-minutes*60));

    if(activity.activity_type === 'Run') {
      return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}/km`;
    }
  }

  handleClick = () => {
    this.props.selectActivity(this.props.activity);
  }

  handleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const editActivity = this.state.edit;
    const { activity } = this.props;
    const selected = (activity === this.props.selectedActivity);
    return(
      <div className={selected ? 'card-product selected' : 'card-product'} onClick={this.handleClick}>
        <img src={this.cardImage(activity.activity_type)}/>
        <i className={selected ? editActivity ? 'fas fa-times edit-icon-x' : 'far fa-edit edit-icon' : '\' '} onClick={this.handleEdit}></i>
        <div className="card-product-infos">
          { editActivity ? <ActivityForm activity={activity} /> : <h2>{activity.name}</h2> }
          { editActivity ? '' : <p>{activity.description ? activity.description : 'No description'}</p> }
          <p>{new Date(activity.start_date).toLocaleDateString('en-GB')}</p>
          <div className="activity-stats">
            <p>{(activity.distance/1000).toFixed(2)} km</p>
            <p>{this.timeConvert(activity)}</p>
            <p>{this.meterConvert(activity)}</p>
            <p>{Math.floor(activity.average_heart_rate)} avg HR</p>
            <p>{Math.floor(activity.max_heart_rate)} max HR</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedActivity: state.selectedActivity
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectActivity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);

