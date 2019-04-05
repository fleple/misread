import React, { Suspense } from 'react';
import { Router } from '@reach/router';
// import DevTools from 'mobx-react-devtools';

import './style/table.scss';

import Header from './ui/Header';
import LoadingPage from './ui/LoadingPage';
import Footer from './ui/Footer';
import NotFound from './pages/NotFound';

const Home = React.lazy(() => import('./pages/Home'));
const Coins = React.lazy(() => import('./pages/Coins'));
const SingleCoin = React.lazy(() => import('./pages/SingleCoin'));
const Profile = React.lazy(() => import('./pages/Profile'));

const App = () => (
  <React.Fragment>
    <Header/>
    <Suspense fallback={<LoadingPage/>}>
      <Router primary={false}>
        <NotFound default />
        <Home path='/' />
        <Coins path='/coins' />
        <SingleCoin path='/coins/:coin' />
        <Profile path='/profile' />
      </Router>
    </Suspense>
    <Footer/>
    {/* <DevTools/> */}
  </React.Fragment>
);

export default App;
