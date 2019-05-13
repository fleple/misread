import React from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from '@reach/router';

import UserCoins from '../components/Profile/UserCoins';
import UserHistory from '../components/Profile/UserHistory';

import '../style/profile.scss';

const Profile = (props) => {
  const { profileStore, coinsStore } = props;

  if(!profileStore.userData.name) {
    return <Redirect from="/" to="not found"/>;
  }

  let sum = profileStore.userData.money;
  for(let i = 0; i < profileStore.userData.coins.length; i++) {
    let current = coinsStore.coins[profileStore.userData.coins[i].id];
    if(current && current.priceUsd) {
      sum += Number(current.priceUsd) * profileStore.userData.coins[i].count;
    }
  }

  return (
    <div className='profile'>
      <div className='sidebar'>
        <div className='user-cash'>
          <h2>{profileStore.userData.name}</h2>
          <hr/>
          <h3>Cash: ${Number(profileStore.userData.money).toFixed(4)}</h3>
        </div>
        {
          profileStore.userData.coins.length
          ? <div className='user-coins'>
              <UserCoins
                userCoins={profileStore.userData.coins}
                coins={coinsStore.coins}
              />
            </div>
          : <div className='user-coins-none'>
              <h3>You haven't any coins :'(</h3>
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
          buyHistory={profileStore.userData.buyHistory}
          sellHistory={profileStore.userData.sellHistory}
        />
      </div>
    </div>
  )
}

export default inject('profileStore', 'coinsStore')(observer(Profile));