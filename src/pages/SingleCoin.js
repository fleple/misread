import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from '@reach/router';

import '../style/single_coin.scss';

import CoinInfo from '../components/SingleCoin/CoinInfo';
import CoinTrade from '../components/SingleCoin/CoinTrade';
import CoinChart from '../components/SingleCoin/CoinChart';
import ButtonsHistory from '../components/SingleCoin/ButtonsHistory';
import UserMoney from '../components/SingleCoin/UserMoney';

import Loading from '../ui/Loading';


class SingleCoin extends Component {
  state = {
    chartOn: false
  };

  componentDidMount() {
    const currentCoin = this.props.uri.split('/')[2];
    this.props.coinsStore.fetchHistory(currentCoin, 'd', 'h1')
      .then(() => this.setState({ chartOn: true }));
  }

  getHistory = (id, flag, step) => {
    this.setState({ chartOn: false });
    this.props.coinsStore.fetchHistory(id, flag, step)
      .then(() => this.setState({ chartOn: true  }));
  }

  render() {
    const { coinsStore, profileStore, uri } = this.props;
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
            {
              profileStore.userData.name ? <>
                <CoinTrade
                  price={currentCoin.priceUsd}
                  id={currentCoin.id}
                  symbol={currentCoin.symbol}
                  buy={profileStore.buyCoins}
                  sell={profileStore.sellCoins}
                />
                <UserMoney
                  user={profileStore.userData}
                  counts={profileStore.coinCounts}
                  symbol={currentCoin.symbol}
                  id={currentCoin.id}
                />
              </> : null
            }
          </div>

          <div className='chart'>
            { this.state.chartOn ?
                <CoinChart
                  coinId={currentId}
                  dataHistory={coinsStore.history}
                /> :
                <Loading/>
            }
          </div>
          
          <ButtonsHistory
            coinId={currentId}
            getHistory={this.getHistory}
          />
        </div>
      );
    } else {
      return <Redirect from="/" to="not found"/>
    }
  }
}

export default inject('coinsStore', 'profileStore')(observer(SingleCoin));