import {
  configure,
  action,
  observable,
  decorate,
  computed
} from 'mobx';

configure({ enforceActions: 'observed' });

class User {
  userData = {};
  error = {};

  setUserData = dataUser => {
    // console.log('res', dataUser);
    this.userData = dataUser;
    localStorage.misread = dataUser.token;
  }

  setError = (type, error) => {
    this.error[type] = error.message;
  }

  signIn = submittedData => {
    console.log('submittedData', submittedData);
    fetch('/api/signIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submittedData)
    }).then(res => res.json())
    .then(json => this.setUserData(json.user));
  }

  login = loginData => {
    console.log('login data', loginData);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }).then(res => res.json())
    .then(json => this.setUserData(json.user));
  }

  initUserFromLocalStorage = () => {
    if(localStorage.misread) {
      fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: localStorage.misread })
      })
      .then(res => res.json())
      .then(json => this.setUserData(json.user));
    }
  }

  logout = () => {
    if(localStorage.misread) {
      localStorage.misread = '';
    }
    this.userData = {};
  }

  buyCoins = (info) => {
    const token = localStorage.misread;
    console.log(info);
    fetch('/api/buycoins', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tradeInfo: info, token: token })
    })
    .then(res => res.json())
    .then(json => {
      if(json.error) { throw Error(json.error.message); }
      this.setUserData(json.user);
    })
    .catch(err => this.setError('buy', err));
  }

  sellCoins = (info) => {
    const token = localStorage.misread;
    console.log('sell', info);
    fetch('/api/sellcoins', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tradeInfo: info, token: token })
    })
    .then(res => res.json())
    .then(json => {
      if(json.error) { throw Error(json.error.message); }
      this.setUserData(json.user);
    })
    .catch(err => this.setError('sell', err));
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

decorate(User, {
  userData: observable,
  error: observable,
  setUserData: action,
  setError: action,
  logout: action,
  coinCounts: computed
});

export default new User();