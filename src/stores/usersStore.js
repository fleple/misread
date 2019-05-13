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
  errors = {};
  offset = 0;
  step = 5;
  noMore = false;

  setUsers = data => {
    this.users.push(...data);
  }

  setOffset = () => this.offset += this.step;
  setNoMore = () => this.noMore = true;

  fetchUsers = () => {
    fetch(`/api/users?skip=${this.offset}`)
      .then(res => res.json())
      .then(json => {
        const users = json.users;
        console.log(users);
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
}

decorate(Users, {
  users: observable,
  offset: observable,
  noMore: observable,
  setUsers: action,
  setOffset: action,
  setNoMore: action
});

export default new Users();