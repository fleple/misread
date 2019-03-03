import React from 'react';

import BuyCoin from './BuyCoin';
import SellCoin from './SellCoin';

const CoinTrade = (props) => {
  return (
    <div className='coin-trade'>
      <BuyCoin {...props} />
      <SellCoin {...props} />
     </div>
  )
}

export default CoinTrade;