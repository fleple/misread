import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import UserCoins from '../components/Profile/UserCoins';
import UserHistory from '../components/Profile/UserHistory';

import Loading from '../ui/Loading';

import '../style/profile.scss';

class AnotherUser extends Component {
  state = {
    loading: true,
    userExist: false,
  };

  componentDidMount() {
    const currentUserName = this.props.uri.split('/')[2];
    this.props.usersStore.fetchUser(currentUserName)
      .then(res => {
        if(res instanceof Error) {
          this.props.navigate('/notFound');
        } else {
          this.setState({ userExist: true, loading: false });
        }
      });
  }

  getTotalSum() {
    const { usersStore, coinsStore } = this.props;
    let sum = usersStore.currentUser.money;
    for(let i = 0; i < usersStore.currentUser.coins.length; i++) {
      let current = coinsStore.coins[usersStore.currentUser.coins[i].id];
      if(current && current.priceUsd) {
        sum += Number(current.priceUsd) * usersStore.currentUser.coins[i].count;
      }
    }
    return sum.toFixed(4);
  }

  render() {
    const { usersStore, coinsStore } = this.props;
    const { userExist , loading } = this.state;

    return (
      <div className='profile'>
        { loading && <Loading/> }
        { userExist && (
          <>
            <div className='sidebar'>
              <div className='user-cash'>
                <h2>{usersStore.currentUser.name}</h2>
                <hr/>
                <h3>Cash: ${Number(usersStore.currentUser.money).toFixed(4)}</h3>
              </div>
              {
                usersStore.currentUser.coins.length
                ? <div className='user-coins'>
                    <UserCoins
                      userCoins={usersStore.currentUser.coins}
                      coins={coinsStore.coins}
                    />
                  </div>
                : <div className='user-coins-none'>
                    <h3>{usersStore.currentUser.name} has not any coins</h3>
                  </div>
              }
              <div className='user-total-money'>
                <h2>Total</h2>
                <hr/>
                <h3>${this.getTotalSum()}</h3>
              </div>
            </div>
            <div className='user-actions'>
              <UserHistory
                buyHistory={usersStore.currentUser.buyHistory}
                sellHistory={usersStore.currentUser.sellHistory}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default inject('usersStore', 'coinsStore')(observer(AnotherUser));