import React from 'react';
import { useDispatch } from 'react-redux';
import { connectFriend } from '../actions/index';

function Friend(props) {
  const dispatch = useDispatch();
  const add_style = {display: props.status === 'users' ? '' : 'none'}
  const rem_style = {display: props.status === 'friends' ? '' : 'none'}
  const { friend } = props;

  function handleClick() {
    dispatch(connectFriend(props.friend.id, 'friend_request'));
  }

  function handleRemove() {
    dispatch(connectFriend(props.friend.id, 'remove_friend'));
  }

  return(
    <div className="card-product">
      <img src={friend.profile_pic} alt=""/>
      <div className="card-product-infos">
        <p>{friend.email}</p>
        <p>{friend.username}</p>
        <p>{friend.uid}</p>
        <button className="btn btn-primary add-friend" style={add_style} onClick={handleClick}>
          <i className="fas fa-plus-square"></i>
          Add friend
        </button>
        <button className="btn btn-primary add-friend" style={rem_style} onClick={handleRemove}>
          <i className="fas fa-plus-square"></i>
          Delete friend
        </button>
      </div>
    </div>
  )
}

export default Friend;
