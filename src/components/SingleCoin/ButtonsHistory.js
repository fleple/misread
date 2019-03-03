import React from 'react';

const ButtonsHistory = ({  coinId, getHistory }) => (
  <div className='buttons-history'>
    <button onClick={() => getHistory(coinId, 'd', 'h1')}>Day</button>
    <button onClick={() => getHistory(coinId, 'w', 'h1')}>Week</button>
    <button onClick={() => getHistory(coinId, 'm', 'd1')}>30 Days</button>
    <button onClick={() => getHistory(coinId, 'm3', 'd1')}>90 Days</button>
    <button onClick={() => getHistory(coinId, 'y', 'd1')}>Year</button>
  </div>
);

export default ButtonsHistory;