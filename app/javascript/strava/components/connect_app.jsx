import React from 'react';
import { FriendList } from '../containers/friend_list';

const ConnectApp = (props) => {
  return (
    <div>
      <div className="friends">
        <FriendList />
      </div>
    </div>
  );
};

export default ConnectApp;
