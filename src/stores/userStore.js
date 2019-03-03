import {
  configure,
  action,
  observable,
  decorate
} from 'mobx';

configure({ enforceActions: 'observed' });

class User {
  userData = {};

  setUserData = dataUser => {
    console.log('res', dataUser);
    this.userData = dataUser;
    localStorage.misread = dataUser.token;
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
      }).then(res => res.json())
      .then(json => this.setUserData(json.user));
    }
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
    }).then(res => res.json())
    .then(json => this.setUserData(json.user));
  }

}

decorate(User, {
  userData: observable,
  setUserData: action
});

export default new User();