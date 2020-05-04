import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, fetchFriends, fetchIncomingRequests } from '../actions';
import Friend from './friend';
import IncomingRequest from './incoming_request';
import FriendForm from './friend_form';

export const FriendList = () => {
  const dispatch = useDispatch();
  const {friends, users, incoming_requests} = useSelector(state => ({
    friends: state.friends,
    users: state.users,
    incoming_requests: state.incomingRequests
  }));

  useEffect(() => {
    dispatch(fetchIncomingRequests());
    dispatch(fetchUsers());
    dispatch(fetchFriends());
  }, [friends.length, users.length]);

  return(
    <div>
      <h1>Your friends</h1>
      {friends.map(fr => <Friend friend={fr} status='friends' key={fr.id} />)}
      <h1>Incoming requests</h1>
      {incoming_requests.map(fr => <IncomingRequest friend={fr} key={fr.id} />)}
      <h1>Find users</h1>
      <FriendForm />
      {users.map(usr => <Friend friend={usr} status='users' key={usr.id} />)}
    </div>
  )
}
