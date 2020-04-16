import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitActivity } from '../actions/index';

function ActivityForm(props) {
  // React hooks: https://reactjs.org/docs/hooks-intro.html
  const name = useFormInput(props.activity.name);
  const description = useFormInput(props.activity.description);

  function handleSubmit(e) {
    e.preventDefault();
    props.submitActivity(props.activity, e.target)
  }

  if(props.activity === props.selectedActivity) {
    return(
      <div>
        <form onSubmit={handleSubmit} className='activity-form'>
          <input type="text" className='input-box'
                             {...name} />
          <input type="text" placeholder={description.value ? '' : 'Add description'}
                             className='input-box'
                             {...description} />
         <button type="submit" value="Submit" className='submit-activity-button'>
           <i type='submit' className="fas fa-arrow-circle-up submit-icon" value='Submit' />
         </button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>{props.activity.name}</h2>
        <p>{props.activity.description ? props.activity.description : 'No description'}</p>
      </div>
    )
  }
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue ? initialValue : '');

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ submitActivity }, dispatch);
}

export default connect(null, mapDispatchToProps)(ActivityForm);
