import React from 'react';
import { observer, inject } from 'mobx-react';

import StockChart from '../components/StockChart';

import '../style/single_stock.scss';

function SingleStock ({ stocksStore, uri }) {
  let currentStock = uri.split('/')[2];
  // stocksStore.fetchHistory(currentStock);

  if(stocksStore.history.symbol) {
    return (
      <div className='single-stock'>
        <h1>Stock! {currentStock}</h1>
        <div className='chart'>
          <StockChart
            symbol={stocksStore.history.symbol}
            labels={stocksStore.history.labels}
            prices={stocksStore.history.prices}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default inject('stocksStore')(observer(SingleStock));