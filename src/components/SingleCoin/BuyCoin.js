import React, { useState } from 'react';

const BuyCoin = (props) => {
  const [ countCoin, setCountCoin ] = useState("");
  const [ totalPrice, setTotalPrice ] = useState("");
  const { price, id, symbol, buy } = props;

  const fixNum = (num, fix) => Number(num).toFixed(fix);

  const changeCount = (e) => {
    const count = e.target.value >= 0 ? e.target.value : 0; 
    setCountCoin(count);
    setTotalPrice(fixNum(count * price, 4))
  }

  const changePrice = (e) => {
    const count = e.target.value >= 0 ? e.target.value : 0;
    setTotalPrice(count);
    setCountCoin(fixNum(count / price, 4));
  }

  const clearForm = () => {
    setCountCoin('');
    setTotalPrice('');
  }

  const buyCoins = (e) => {
    e.preventDefault();
    const buyInfo = {
      count: countCoin,
      id,
      symbol
    };
    clearForm();
    buy(buyInfo);
  }

  return (
    <form className='coin-trade-form' onSubmit={buyCoins}>
      <input
        type='number'
        value={countCoin}
        onChange={changeCount}
        placeholder={id}
      />
      <input
        type='number'
        value={totalPrice}
        onChange={changePrice}
        placeholder='usd'
      />
      <button type='submit'>Buy {symbol}</button>
    </form>
  );
}

export default BuyCoin;