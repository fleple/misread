import {
  configure,
  action,
  observable,
  decorate
} from 'mobx';

configure({ enforceActions: 'observed' });

const key = '2XgrSDFDInxaWYrRWHvsd0AyMLtxeNAylSaJmqEVgdox1RE8DgVRAuohWbKv';
// const keyAlphavantage = '45RUAAK319BP2GU4';

class Stocks {
  stocks = {};
  history = {};

  setStocksData = (data) => {
    for(let i = 0; i < data.length; i++) {
      this.stocks[ data[i].symbol ] = data[i];
    }
  }

  //too strange, should change
  // setHistoryData = (data) => {
  //   console.log(data);
  //   this.history.symbol = data['Meta Data']['2. Symbol'];
  //   this.history.labels = Object.keys(data['Time Series (60min)']);
  //   const prices = [];
  //   for(let item in data['Time Series (60min)']) {
  //     prices.push(data['Time Series (60min)'][item]['4. close']);
  //   }
  //   this.history.prices = prices;
  // }

  // setHistoryData = (data) => {
  //   console.log(data);
  //   this.history.symbol = data.symbol;
  //   this.history.labels = Object.keys(data.intraday);
  //   const prices = [];
  //   for(let item in data.intraday) {
  //     prices.push(data.intraday[item].close);
  //   }
  //   this.history.prices = prices;
  // }

  fetchStocks = (symbols = 'AAPL,FB,GOOG,AMZN,MSFT') => {
    return fetch(`https://www.worldtradingdata.com/api/v1/stock?symbol=${symbols}&api_token=${key}&sort_order=asc`)
      .then(res => res.json())
      .then(json => this.setStocksData(json.data));
  }

  // fetchHistory = (symbol = 'AAPL') => {
  //   return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${keyAlphavantage}`)
  //     .then(res => res.json())
  //     .then(json => this.setHistoryData(json));
  // }

  // fetchHistory = (symbol = 'AAPL') => {
  //   return fetch(`https://www.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&range=30&interval=60&api_token=${key}`)
  //     .then(res => res.json())
  //     .then(json => this.setHistoryData(json));
  // }

}

decorate(Stocks, {
  stocks: observable,
  history: observable,
  setStocksData: action,
  setHistoryData: action
});

export default new Stocks();