import React from 'react';
import { observer, inject } from 'mobx-react';

import '../../style/ladder.scss';

const Ladder = (props) => {
  const { usersStore, nav } = props;

  if(usersStore.users.length === 0) {
    usersStore.fetchUsers();
  }

  const moreUsers = (e) => {
    e.preventDefault();
    console.log(usersStore.fetchUsers());
  }

  return (
    <div className='ladder'>
      <table className='ladder-table'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Cash</th>
          </tr>
        </thead>
        <tbody>
          { usersStore.users.map((user, index) => (
            <tr key={user._id} onClick={() => { nav(`/user/${user.name}`)}}>
              <td>#{index + 1}</td>
              <td>{user.name}</td>
              <td>${Number(user.money).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        !usersStore.noMore && <button className='btn-more' onClick={moreUsers}>More Users</button>
      }
    </div>
  );
};

export default inject('usersStore')(observer(Ladder));