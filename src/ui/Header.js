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
      isOpenedModal: false,
      toSign: true,
      isOpenedMenu: false
    }
  }

  toggleModal = () => this.setState({ isOpenedModal: !this.state.isOpenedModal });
  closeModal = () => this.setState({ isOpenedModal: false });

  setLogin = () => this.setState({ toSign: false });
  setSign = () => this.setState({ toSign: true });

  render() {
    const { isOpenedModal, toSign } = this.state;
    const { profileStore } = this.props;

    const toggleMenu = () => {
      this.setState({ isOpenedMenu: !this.state.isOpenedMenu });
    }

    const closeMenu = () => {
      this.setState({ isOpenedMenu: false });
    }

    return (
      <div className='header-wrap'>
      <header className='header'>
        <nav className='nav-bar'>
          <ul className='header-list'>
            <li className='pepele-item' onClick={closeMenu}>
              <Link to='/'>Pepele</Link>
            </li>
            <li className='coins-item'>
              <Link to='/coins'>Coins</Link>
            </li>
            { profileStore.userData.name ?
                <li className='profile-item'>
                  <Link to='/profile'>{ profileStore.userData.name }</Link>
                </li> :
                <li className='profile-item' onClick={this.toggleModal}>
                  <button>Sign In</button>
                </li>
            }
          </ul>
          <div className='rs-btn' onClick={toggleMenu}>
            <span className='rs-line'></span>
            <span className='rs-line'></span>
            <span className='rs-line'></span>
          </div>
        </nav>
        <div className={this.state.isOpenedMenu ? 'rs-menu open' : 'rs-menu'}>
          <ul onClick={closeMenu}>
            <li>
              <Link to='/coins'>Coins</Link>
            </li>
            { profileStore.userData.name ?
              <li>
                <Link to='/profile'>{ profileStore.userData.name }</Link>
              </li>
                :
              <li className='profile-item' onClick={this.toggleModal}>
                <button>Sign In</button>
              </li>
            }
            {
              profileStore.userData.name &&
              <li>
                <button className='user-logout' onClick={profileStore.logout}>
                  <img src={logoutIcon} alt='logout'/>
                </button>  
              </li>
            }
            <li>
              <button className='theme-switcher' onClick={switchTheme}>
                <img src={nightIcon} alt='switch'/>
              </button>
            </li>
          </ul>
        </div>
        <div className='nav-right'>
          {
            profileStore.userData.name &&
            <button className='user-logout' onClick={profileStore.logout}>
              <img src={logoutIcon} alt='logout'/>
            </button>
          }
          <button className='theme-switcher' onClick={switchTheme}>
            <img src={nightIcon} alt='switch'/>
          </button>
        </div>
        { isOpenedModal && (
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

export default inject('profileStore')(observer(Header));