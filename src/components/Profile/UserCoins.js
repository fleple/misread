import React from 'react';
import { Link } from '@reach/router';

const UserCoins = (props) => (
  <ul className='user-coins-list'>
  {
    props.coins.map(coin => (
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
);

export default UserCoins;