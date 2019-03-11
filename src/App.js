import React, { Suspense } from 'react';
import { Router } from '@reach/router';
// import DevTools from 'mobx-react-devtools';

import './style/table.scss';

import Header from './ui/Header';
import LoadingPage from './ui/LoadingPage';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Coins = React.lazy(() => import('./pages/Coins'));
const SingleCoin = React.lazy(() => import('./pages/SingleCoin'));
const Profile = React.lazy(() => import('./pages/Profile'));

const App = () => (
  <React.Fragment>
    <Header/>
    <Suspense fallback={<LoadingPage/>}>
      <Router primary={false}>
        <Home path='/' />
        <Coins path='/coins' />
        <SingleCoin path='/coins/:coin' />
        <About path='/about' />
        <Profile path='/profile' />
      </Router>
    </Suspense>
    {/* <DevTools/> */}
  </React.Fragment>
);

export default App;
