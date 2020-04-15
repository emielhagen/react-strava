import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitActivity } from '../actions/index';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
                    name_value: '',
                    description_value: ''
                  };
  }

  handleChangeName = (event) => {
    this.setState({name_value: event.target.value});
  }

  handleChangeDescription = (event) => {
    this.setState({description_value: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitActivity(this.props.activity, e.target)
  }

  renderIfSelected(activity) {
    const selected = (activity === this.props.selectedActivity);
    if(selected){
      return(
        <div>
          <form onSubmit={this.handleSubmit} className='activity-form'>
            <input type="text" className='input-box'
                               value={this.state.name_value ? this.state.name_value : activity.name}
                               onChange={this.handleChangeName} />
            <input type="text" placeholder={this.state.description_value ? '' : activity.description ? '' : 'Add description'}
                               className='input-box'
                               value={this.state.description_value ? this.state.description_value : activity.description ? activity.description : ''}
                               onChange={this.handleChangeDescription} />
           <button type="submit" value="Submit" className='submit-activity-button'>
             <i type='submit' className="fas fa-arrow-circle-up submit-icon" value='Submit' />
           </button>
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <h2>{activity.name}</h2>
          <p>{activity.description ? activity.description : 'No description'}</p>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        { this.renderIfSelected(this.props.activity) }
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
  return bindActionCreators({ submitActivity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
