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
        return 'https://previews.123rf.com/images/nikiteev/nikiteev1609/nikiteev160901559/62757103-vector-color-cartoon-illustration-running-shoes-on-white-background.jpg';
      case 'Ride':
        return 'https://media.istockphoto.com/vectors/bicycle-isolated-vector-illustration-flat-cartoon-bike-vector-id586713616';
      case 'Swim':
        return "https://getdrawings.com/vectors/goggles-vector-33.jpg";
      default:
        return "https://media.istockphoto.com/vectors/set-of-vector-cartoon-gym-icons-vector-id528630296";
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

  renderData(activity) {
    return(
      <div>
        <h2>{activity.name}</h2>
        <p>{activity.description ? activity.description : 'No description'}</p>
      </div>
    )
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
          { editActivity ? <ActivityForm activity={activity} selectedActivity={this.props.selectedActivity} /> : this.renderData(activity) }
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

