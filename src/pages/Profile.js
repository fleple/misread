import React from 'react';
import { observer, inject } from 'mobx-react';

import UserCoins from '../components/Profile/UserCoins';
import UserHistory from '../components/Profile/UserHistory';

import '../style/profile.scss';

const Profile = (props) => {
  const { userStore, coinsStore } = props;

  if(!userStore.userData.name) {
    return null;
  }

  let sum = userStore.userData.money;
  for(let i = 0; i < userStore.userData.coins.length; i++) {
    let current = coinsStore.coins[userStore.userData.coins[i].id];
    if(current && current.priceUsd) {
      sum += Number(current.priceUsd) * userStore.userData.coins[i].count;
    }
  }

  return (
    <div className='profile'>
      <div className='sidebar'>
        <div className='user-cash'>
          <h2>{userStore.userData.name}</h2>
          <hr/>
          <h3>Cash: ${Number(userStore.userData.money).toFixed(4)}</h3>
        </div>
        {
          userStore.userData.coins.length &&
          <div className='user-coins'>
            <UserCoins coins={userStore.userData.coins}/>
          </div>
        }
        <div className='user-total-money'>
          <h2>Total</h2>
          <hr/>
          <h3>${sum.toFixed(4)}</h3>
        </div>
      </div>
      <div className='user-actions'>
        <UserHistory
          buyHistory={userStore.userData.buyHistory}
          sellHistory={userStore.userData.sellHistory}
        />
      </div>
    </div>
  )
}

export default inject('userStore', 'coinsStore')(observer(Profile));