import React, { Component } from 'react';
import { Link } from '@reach/router';
import { inject, observer } from 'mobx-react';

import Modal from './Modal';
import SignIn from './SignIn';
import LogIn from './LogIn';

import '../style/header.scss';
import nightIcon from '../assets/night.png';
import logoutIcon from '../assets/logout.png'


import switchTheme from '../helpers/switchTheme';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      toSign: true
    }
  }

  toggleModal = () => this.setState({ isOpened: !this.state.isOpened });
  closeModal = () => this.setState({ isOpened: false });

  setLogin = () => this.setState({ toSign: false });
  setSign = () => this.setState({ toSign: true });

  render() {
    const { isOpened, toSign } = this.state;
    const { userStore } = this.props;

    return (
      <div className='header-wrap'>
      <header className='header'>
        <nav>
          <ul className='header-list'>
            <li>
              <Link to='/'>Pepele</Link>
            </li>
            <li>
              <Link to='/coins'>Coins</Link>
            </li>
            { userStore.userData.name ?
                <>
                  <li>
                    <Link to='/profile'>{ userStore.userData.name }</Link>
                  </li>
                </> :
                <li onClick={this.toggleModal}>
                  <button>Sign In</button>
                </li>
            }
          </ul>
        </nav>
        <div className='nav-right'>
          {
            userStore.userData.name &&
            <button className='user-logout' onClick={userStore.logout}>
              <img src={logoutIcon} alt='logout'/>
            </button>
          }
          <button className='theme-switcher' onClick={switchTheme}>
            <img src={nightIcon} alt='switch'/>
          </button>
        </div>
        { isOpened && (
          <Modal close={this.toggleModal}>
            <div className='form-choose'>
              <button className='form-choose-btn' onClick={this.setSign}>Sign In</button>
              <button className='form-choose-btn' onClick={this.setLogin}>Log In</button>
            </div>
            {toSign ? <SignIn close={this.closeModal}/> : <LogIn close={this.closeModal}/>}
          </Modal>
        )}
    </header>
    </div>
    )
  }


}

export default inject('userStore')(observer(Header));