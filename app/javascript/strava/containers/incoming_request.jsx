import React from 'react';
import { useDispatch } from 'react-redux';
import { connectFriend } from '../actions/index';

function IncomingRequest(props) {
  const dispatch = useDispatch();
  const { friend } = props;


  function handleAccept() {
    dispatch(connectFriend(friend.id, 'confirm_friend_request'));
  }

  function handleDecline() {
    dispatch(connectFriend(friend.id, 'decline_friend_request'));
  }

  return(
    <div className="card-product">
      <img src={friend.profile_pic} alt=""/>
      <div className="card-product-infos">
        <p>{friend.email}</p>
        <p>{friend.username}</p>
        <p>{friend.uid}</p>
        <button className="btn btn-primary add-friend" onClick={handleAccept}>
          <i className="fas fa-plus-square"></i>
          Accept
        </button>
        <button className="btn btn-primary add-friend" onClick={handleDecline}>
          <i className="fas fa-plus-square"></i>
          Decline
        </button>
      </div>
    </div>
  )
}

export default IncomingRequest;
