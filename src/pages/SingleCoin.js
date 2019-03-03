import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../style/single_coin.scss';

import CoinInfo from '../components/SingleCoin/CoinInfo';
import CoinTrade from '../components/SingleCoin/CoinTrade';
import CoinChart from '../components/SingleCoin/CoinChart';
import ButtonsHistory from '../components/SingleCoin/ButtonsHistory';

class SingleCoin extends Component {
  componentDidMount() {
    const currentCoin = this.props.uri.split('/')[2];
    this.props.coinsStore.fetchHistory(currentCoin, 'd', 'h1')
  }

  render() {
    const { coinsStore, userStore, uri } = this.props;
    const currentId = uri.split('/')[2];
    const currentCoin = coinsStore.getCoin(currentId); 
    if(currentCoin) {
      return (
        <div className='single-coin-page'>
          <div className='single-coin-top'>
            <CoinInfo
              coin={currentCoin}
              id={currentCoin.id}
              symbol={currentCoin.symbol}
              rank={currentCoin.rank}
              market={currentCoin.marketCapUsd}
              price={currentCoin.priceUsd}
              percent={currentCoin.changePercent24Hr}
            />
            <CoinTrade
              price={currentCoin.priceUsd}
              id={currentCoin.id}
              symbol={currentCoin.symbol}
              buy={userStore.buyCoins}
            />
          </div>

          <div className='chart'>
            { coinsStore.history.coinId === currentId ?
                <CoinChart
                  coinId={currentId}
                  dataHistory={coinsStore.history}
                /> :
                <h1>Loading...</h1>
            }
          </div>

          <ButtonsHistory
            coinId={currentId}
            getHistory={coinsStore.fetchHistory}
          />
        </div>
      );
    } else {
      return <h1>No info</h1>
    }
  }
}

export default inject('coinsStore', 'userStore')(observer(SingleCoin));