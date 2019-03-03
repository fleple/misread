import React from 'react';
import StocsTable from '../components/StocksTable';

const Stocks = (props) => (
  <>
    <StocsTable nav={props.navigate}/>
  </>
);

export default Stocks;