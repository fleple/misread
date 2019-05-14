import {
  configure,
  action,
  observable,
  decorate,
  // computed
} from 'mobx';

configure({ enforceActions: 'observed' });

class Users {
  users = [];
  errors = [];
  currentUser = {};
  offset = 0;
  step = 5;
  noMore = false;

  setUsers = data => {
    this.users.push(...data);
  }

  setOffset = () => this.offset += this.step;
  setNoMore = () => this.noMore = true;
  setCurrentUser = (user) => this.currentUser = user;
  setError = (msg) => this.errors.push(msg);

  fetchUsers = () => {
    fetch(`/api/users?skip=${this.offset}`)
      .then(res => res.json())
      .then(json => {
        const users = json.users;
        // console.log(users);
        if(users) {
          this.setUsers(users);
          this.setOffset();
          if(users.length % this.step !== 0) {
            this.setNoMore();
          }
        }
        
        if(users.length === 0) {
          this.setNoMore();
        }

      });
  }

  fetchUser = (name) => {
    return fetch(`/api/user?name=${name}`)
      .then(res => res.json())
      .then(json => {
        const user = json.user;
        const error = json.error;
        if(error) {
          this.setError(error.msg);
          return new Error(error.msg);
        }

        if(user) {
          this.setCurrentUser({
            ...user,
            sellHistory: user.sellHistory.reverse(),
            buyHistory: user.buyHistory.reverse()
          });
        }
      });
  }

}

decorate(Users, {
  users: observable,
  offset: observable,
  noMore: observable,
  currentUser: observable,
  setError: observable,
  setUsers: action,
  setOffset: action,
  setNoMore: action,
  setCurrentUser: action
});

export default new Users();