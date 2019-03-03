import React from 'react';
import CoinsTable from '../components/CoinsTable';
import MoreCoins from '../components/MoreCoins';

const Coins = (props) => (
  <>
    <CoinsTable nav={props.navigate}/>
    <MoreCoins/>
  </>
);


export default Coins;