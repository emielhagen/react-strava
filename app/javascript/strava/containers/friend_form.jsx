import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findUser } from '../actions';

function FriendForm() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(findUser(name));
  }

  return(
    <div>
      <form onSubmit={handleSubmit} className='friend-form'>
        <input type="text" className='input-box' value={name} onChange={(e) => setName(e.target.value)} />
      </form>
    </div>
  )
}

export default FriendForm;
