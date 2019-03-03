import React from 'react';
import shortPrice from '../../helpers/shortPrice';

const CoinInfo = (props) => {

  return (
    <div className='coin-info'>
      <div className='info-head'>
        <div className='wrap-img'>
          <img src={`https://static.coincap.io/assets/icons/${props.symbol.toLowerCase()}@2x.png`} alt='icon-coin'/>
        </div>
        <h2>#{props.rank} {props.symbol} {props.id}</h2>
      </div>
      <hr/>
      <h2>${Number(props.price).toFixed(6)}</h2>
      <h3>Market Cap: ${shortPrice(props.market)}</h3>
      <h3>24 hours change: {Number(props.percent).toFixed(4)}%</h3>
    </div>
  );
}

export default CoinInfo;