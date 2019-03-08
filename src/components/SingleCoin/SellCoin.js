import React, { useState } from 'react';

const SellCoin = (props) => {
  const [ countSell, setCountSell ] = useState("");
  const [ profitValue, setProfitValue ] = useState("");
  const { price, id, symbol, sell } = props;

  const fixNum = (num, fix) => Number(num).toFixed(fix);

  const changeCount = (e) => {
    const count = e.target.value >= 0 ? e.target.value : 0; 
    setCountSell(count);
    setProfitValue(fixNum(count * price, 4));
  }

  const changeProfit = (e) => {
    const count = e.target.value >= 0 ? e.target.value : 0; 
    setProfitValue(count);
    setCountSell(fixNum(count / price, 4));
  }

  const clearForm = () => {
    setCountSell('');
    setProfitValue('');
  }

  const sellCoins = (e) => {
    e.preventDefault();
    const sellInfo ={
      count: countSell,
      id,
      symbol
    };

    clearForm();
    sell(sellInfo);
  }

  return (
    <form className='coin-trade-form' onSubmit={sellCoins}>
      <input
        type='number'
        value={countSell}
        onChange={changeCount}
        placeholder={id}
        step='any'
      />
      <input
        type='number'
        value={profitValue}
        onChange={changeProfit}
        placeholder='usd'
        step='any'
      />
      <button type='submit'>Sell {symbol}</button>
    </form>
  );
}

export default SellCoin;