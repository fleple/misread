import {
  configure,
  action,
  observable,
  decorate,
  computed
} from 'mobx';

import postReq from '../helpers/postReq';

configure({ enforceActions: 'observed' });

class Profile {
  userData = {};
  error = {};

  setUserData = dataUser => {
    this.userData = dataUser;
    localStorage.misread = dataUser.token;
  }

  setError = (type, error) => {
    this.error[type] = error.message;
  }

  // actions
  signIn = submittedData => {
    postReq('/api/signIn', submittedData)
      .then(res => res.json())
      .then(json => {
        if(json.error) { throw Error(json.error.message); }
        this.setUserData(json.user);
      })
      .catch(err => this.setError('signError', err));
  }

  login = loginData => {
    postReq('/api/login', loginData)
      .then(res => res.json())
      .then(json => {
        if(json.error) { throw Error(json.error.message); }
        this.setUserData(json.user);
      })
      .catch(err => this.setError('loginError', err));
  }

  initUserFromLocalStorage = () => {
    return postReq('/api/auth', {token: localStorage.misread })
      .then(res => res.json())
      .then(json => this.setUserData(json.user))
      .catch(err => this.setError('initUserError', err));
  }

  logout = () => {
    if(localStorage.misread) {
      localStorage.misread = '';
    }
    this.userData = {};
  }

  buyCoins = (info) => {
    const token = localStorage.misread;
    console.log('buy', info);

    postReq('/api/buycoins', { tradeInfo: info, token: token })
      .then(res => res.json())
      .then(json => {
        if(json.error) { throw Error(json.error.message); }
        this.setUserData(json.user);
      })
      .catch(err => this.setError('buyError', err));
  }

  sellCoins = (info) => {
    const token = localStorage.misread;
    console.log('sell', info);

    postReq('/api/sellcoins', { tradeInfo: info, token: token })
      .then(res => res.json())
      .then(json => {
        if(json.error) { throw Error(json.error.message); }
        this.setUserData(json.user);
      })
      .catch(err => this.setError('sellError', err));
  }

  // should rename
  get coinCounts() {
    const obj = {};
    const { coins } = this.userData;
    for(let i = 0; i < coins.length; i++) {
      obj[ coins[i].id ] = coins[i].count;
    }

    return obj;
  }

}

decorate(Profile, {
  userData: observable,
  error: observable,
  setUserData: action,
  setError: action,
  logout: action,
  coinCounts: computed
});

export default new Profile();