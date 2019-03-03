import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from '@reach/router';

import '../style/profile.scss';

const Profile = (props) => {
  const { userStore } = props;

  return (
    <div className='profile'>
      <div className='sidebar'>
        <div className='user-cash'>
          <h2>{userStore.userData.name}</h2>
          <hr/>
          <h3>Cash: ${Number(userStore.userData.money).toFixed(4)}</h3>
        </div>
        <div className='user-coins'>
          <ul className='user-coins-list'>
            {
              userStore.userData.coins.map(coin => (
                <li key={coin.id}>
                  <Link to={`/coins/${coin.id}`}>
                    <div className='left'>
                      <div className='wrap-img'>
                        <img src={`https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} alt='icon-coin'/>
                      </div>
                      <span className='coin-symbol'>{coin.symbol}</span>
                    </div>
                    <span className='coin-count'>{coin.count}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='user-total-money'>
          <h2>Total money</h2>
          <hr/>
          <h3>total cash computed</h3>
        </div>
      </div>
      <div className='user-actions'>
        <h1>user actions history</h1>
      </div>
    </div>
  )
}

export default inject('userStore')(observer(Profile));