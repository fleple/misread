import React from 'react';
import { Link } from '@reach/router';

import getIconBySymbol from '../../helpers/getIconBySymbol';

const UserCoins = ({ userCoins, coins }) => (
  <ul className='user-coins-list'>
    {
      userCoins.map(coin => (
        <li key={coin.id}>
          <Link to={`/coins/${coin.id}`}>
            <div className='left'>
              <div className='wrap-img'>
                <img src={getIconBySymbol(coin.symbol)} alt='icon-coin'/>
              </div>
              <span className='coin-symbol'>{coin.symbol}</span>
            </div>
            <div className='right'>
              <span className='coin-count'>{coin.count}</span>
              {coins[coin.id] && <span>${ Number(coins[coin.id].priceUsd).toFixed(2) }</span>}
            </div>
          </Link>
        </li>
      ))
    }
  </ul>
);


export default UserCoins;