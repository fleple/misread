import React, { useState } from 'react';

const SellCoin = (props) => {
  const [ countSell, setCountSell ] = useState("");
  const [ profitValue, setProfitValue ] = useState("");
  const { price, id, symbol } = props;

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

  return (
    <form className='coin-trade-form'>
      <input
        type='number'
        value={countSell}
        onChange={changeCount}
        placeholder={id}
      />
      <input
        type='number'
        value={profitValue}
        onChange={changeProfit}
        placeholder='usd'
      />
      <button type='submit'>Sell {symbol}</button>
    </form>
  );
}

export default SellCoin;