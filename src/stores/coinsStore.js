import {
  configure,
  action,
  observable,
  decorate
} from 'mobx';

configure({ enforceActions: 'observed' });

class Coins {
  coins = {};
  socket = null;
  step = 20;
  offset = 0;
  history = {};

  setCoinsData = data => {
    for(let i = 0; i < data.length; i++) {
      this.coins[ data[i].id ] = data[i];
    }
  }

  setSingleCoinData = data => {
    this.coins[ data.id ] = data;
  }

  setOffset = offset => this.offset += offset;

  changeCoinsPrices = (newPrices) => {
    for(let coinId in newPrices) {
      if(this.coins[coinId]) {
        this.coins[coinId].priceUsd = newPrices[coinId];
      }
    }
  }

  //wtf?
  setHistory = (data) => {
    const historyData = data.map(item => item.priceUsd);
    let historyLabels;
    if(data.flag === 'd' || data.flag === 'w') {
      historyLabels = data.map(item => {
        const hour = (new Date(item.time)).getHours();
        return hour <= 12 ? hour + 'am' : hour - 12 + 'pm';
      });
    } else {
      historyLabels = data.map(item => {
        const date = (new Date(item.time)).toDateString();
        return date.split(' ').slice(1,3).join(' ');
      });
    }
    this.history.data = historyData;
    this.history.labels = historyLabels
    this.history.coinId = data.coinId;
  }

  setRefreshedData = (data) => {
    const dataObj = {};
    for(let i = 0; i < data.length; i++) {
      dataObj[ data[i].id ] = data[i];
    }

    for(let id in this.coins) {
      if(dataObj[id]) {
        this.coins[id].rank = dataObj[id].rank;
        this.coins[id].marketCapUsd = dataObj[id].marketCapUsd;
        this.coins[id].volumeUsd24Hr = dataObj[id].volumeUsd24Hr;
        this.coins[id].changePercent24Hr = dataObj[id].changePercent24Hr;
      }
    }
  }

  // actions
  fetchCoins = () => {
    return fetch(`https://api.coincap.io/v2/assets?limit=${this.step}&offset=${this.offset}`)
      .then(res => res.json())
      .then(json => {
        this.setCoinsData(json.data);
        this.setOffset(this.step)
      });
  }

  fetchCoin = (id) => {
    if(!this.coins[id])
      return fetch(`https://api.coincap.io/v2/assets/${id}`)
        .then(res => res.json())
        .then(json => {
          this.setSingleCoinData(json.data);
        });
  }

  fetchHistory = (coinId, flag, interval) => {
    const end = Date.now();
    let start = 0;
    switch(flag) {
      case 'd':
        start = end - (24 * 60 * 60 * 1000);
        break;
      case 'w':
        start = end - (24 * 60 * 60 * 1000 * 7);
        break;
      case 'm':
        start = end - (24 * 60 * 60 * 1000 * 30);
        break;
      case 'm3':
        start = end - (24 * 60 * 60 * 1000 * 90);
        break;
      case 'y':
        start = end - (24 * 60 * 60 * 1000 * 365);
        break;
      default:
        break;
    }
    
    return fetch(`https://api.coincap.io/v2/assets/${coinId}/history?interval=${interval}&start=${start}&end=${end}`)
      .then(res => res.json())
      .then(json => {
        const data = json.data;
        if(data) {
          data.flag = flag;
          data.coinId = coinId;
          this.setHistory(data);
        }
      });
  }

  getCoin = (coinId) => {
    return this.coins[coinId];
  }

  refreshData = () => {
    fetch(`https://api.coincap.io/v2/assets?limit=${this.offset || 20}`)
      .then(res => res.json())
      .then(json => {
        const data = json.data;
        this.setRefreshedData(data);
      });
  }

  startSocket = () => {
    const coinKeys = Object.keys(this.coins);
    const coinsList = coinKeys.length <= 40 ? coinKeys.join(',') : 'ALL';
    this.socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinsList}`);
    // this.socket.onclose = () => setTimeout(() => {this.startSocket()}, 5000);
    this.socket.onclose = (evt) => {
      console.log('socket is closed', evt);
      setTimeout(() => {
        console.log('retry socket');
        this.startSocket();
      },1000);
    }
  }


  closeSocket = () => {
    this.socket.close();
  }

  readSocket = () => {
    this.socket.onmessage = (evt) => {
      const newCoinsPrices = JSON.parse(evt.data);
      this.changeCoinsPrices(newCoinsPrices);
    }
  }

}

decorate(Coins, {
  coins: observable,
  offset: observable,
  setCoinsData: action,
  setOffset: action,
  changeCoinsPrices: action,
  setHistory: action,
  setRefreshedData: action,
  setSingleCoinData: action
});

export default new Coins();
