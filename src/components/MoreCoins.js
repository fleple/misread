import React from 'react';
import { observer, inject } from 'mobx-react';

const MoreCoins = ({ coinsStore }) => {

  const getMore = () => {
    coinsStore.fetchCoins()
      .then(() => coinsStore.closeSocket())
      .then(() => coinsStore.startSocket())
      .then(() => coinsStore.readSocket())
  }

  return (
    <div className='more-coins'>
      <button className='more-coins-btn' onClick={getMore}>More Coins</button>
    </div>
  )
}

export default inject('coinsStore')(observer(MoreCoins));