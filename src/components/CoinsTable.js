import React from 'react';
import { observer, inject } from 'mobx-react';

import shortPrice from '../helpers/shortPrice';
import '../style/coins.scss';

const CoinsTable = (props) => {
  const { coinsStore, nav } = props;
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
          Object.keys(coinsStore.coins).map(coin => (
            <tr key={coin} onClick={() => { nav(`/coins/${coin}`)}}>
              <td className='coins-table-rank'>
                <div className='coin-rank'>
                  <div className='rank'>#{coinsStore.coins[coin].rank}</div>
                  <div className='wrap-img'>
                    <img src={`https://static.coincap.io/assets/icons/${coinsStore.coins[coin].symbol.toLowerCase()}@2x.png`} alt='icon-coin'/>
                  </div>
                </div>
              </td>
              <td>{coinsStore.coins[coin].symbol} {coin}</td>
              <td>${Number(coinsStore.coins[coin].priceUsd).toFixed(4)}</td>
              <td className={coinsStore.coins[coin].changePercent24Hr > 0 ? "green" : "red"}>
                {Number(coinsStore.coins[coin].changePercent24Hr).toFixed(2)}%
              </td>
              <td>${shortPrice(coinsStore.coins[coin].marketCapUsd)}</td>
              <td>${shortPrice(coinsStore.coins[coin].volumeUsd24Hr)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default inject('coinsStore')(observer(CoinsTable));