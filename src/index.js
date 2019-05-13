import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import switchTheme from './helpers/switchTheme';

import App from './App';
import './style/main.scss';

import coinsStore from './stores/coinsStore';
import profileStore from './stores/profileStore';
import usersStore from './stores/usersStore';

function initState() {
  if(localStorage.misread) {
    profileStore.initUserFromLocalStorage()
      .then(() => coinsStore.fetchCoins())
      .then(() => {
        const coins = coinsStore.coins;
        const userCoins = profileStore.userData.coins;
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
  profileStore,
  usersStore
};

ReactDOM.render(
  <Provider {...stores}>
    <App/>
  </Provider>,
document.getElementById('root'));
