import React from 'react';
import { observer, inject } from 'mobx-react';

import shortPrice from '../helpers/shortPrice';
import getIconBySymbol from '../helpers/getIconBySymbol';
import '../style/coins.scss';

const CoinsTable = (props) => {
  const { coinsStore, nav } = props;
  const { coins } = coinsStore;
  
  return (
    <table className='price-table'>
      <thead>
        <tr>
          <th className='coins-table-rank'>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>Change 24h</th>
          <th>Market Cap</th>
          <th>Volume 24h</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(coins).map(coin => (
            <tr key={coin} onClick={() => { nav(`/coins/${coin}`)}}>
              <td className='coins-table-rank'>
                <div className='coin-rank'>
                  <div className='rank'>#{coins[coin].rank}</div>
                  <div className='wrap-img'>
                    <img src={getIconBySymbol(coins[coin].symbol)} alt='icon-coin'/>
                  </div>
                </div>
              </td>
              <td>
                <span className='table-coin-symbol'>{coins[coin].symbol} </span>
                <span className='table-coin-id'>{coin}</span>
              </td>
              <td>${Number(coins[coin].priceUsd).toFixed(4)}</td>
              <td className={coins[coin].changePercent24Hr > 0 ? "green" : "red"}>
                {Number(coins[coin].changePercent24Hr).toFixed(2)}%
              </td>
              <td>${shortPrice(coins[coin].marketCapUsd)}</td>
              <td>${shortPrice(coins[coin].volumeUsd24Hr)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default inject('coinsStore')(observer(CoinsTable));