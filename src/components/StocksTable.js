import React from 'react';
import { observer, inject } from 'mobx-react';

import shortPrice from '../helpers/shortPrice';

const StocksTable = (props) => {
  const { stocksStore, nav } = props;
  return (
    <table className='price-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change 24h</th>
          <th>Market</th>
          <th>Volume 24h</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(stocksStore.stocks).map(stock => (
            <tr key={stock} onClick={() => { nav(`/stocks/${stock}`)}}>
              <td>{stocksStore.stocks[stock].name}</td>
              <td>{stocksStore.stocks[stock].symbol}</td>
              <td>${stocksStore.stocks[stock].price}</td>
              <td className={stocksStore.stocks[stock].change_pct > 0 ? 'green' : 'red'}>
                {stocksStore.stocks[stock].change_pct}%
              </td>
              <td>${shortPrice(stocksStore.stocks[stock].market_cap)}</td>
              <td>${shortPrice(stocksStore.stocks[stock].volume)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default inject('stocksStore')(observer(StocksTable));