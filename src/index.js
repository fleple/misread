import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import switchTheme from './helpers/switchTheme';

import App from './App';
import './style/main.scss';

import coinsStore from './stores/coinsStore';
import userStore from './stores/userStore';

function initState() {
  if(localStorage.misread) {
    userStore.initUserFromLocalStorage()
      .then(() => coinsStore.fetchCoins())
      .then(() => {
        const coins = coinsStore.coins;
        const userCoins = userStore.userData.coins;
        for(let i = 0; i < userCoins.length; i++) {
          if(!(userCoins[i].id in coins)) {
            coinsStore.fetchCoin(userCoins[i].id);
          }
        }
      })
      .then(() => coinsStore.startSocket())
      .then(() => coinsStore.readSocket());
  } else {
    coinsStore.fetchCoins()
      .then(() => coinsStore.startSocket())
      .then(() => coinsStore.readSocket());
  }

  setInterval(() => {
    coinsStore.refreshData();
  }, 50000);

  if(localStorage.misreadTheme === 'light') {
    switchTheme();
  }

}


initState();

const stores = {
  coinsStore,
  userStore
};

ReactDOM.render(
  <Provider {...stores}>
    <App/>
  </Provider>,
document.getElementById('root'));
