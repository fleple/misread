import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import './style/main.scss';

import coinsStore from './stores/coinsStore';
import userStore from './stores/userStore';

function initState() {
  coinsStore.fetchCoins()
    .then(() => coinsStore.startSocket())
    .then(() => coinsStore.readSocket());
  
  setInterval(() => {
    coinsStore.refreshData();
  },10000);
  
  userStore.initUserFromLocalStorage();
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
