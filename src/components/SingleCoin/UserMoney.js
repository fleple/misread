import React from 'react';

const UserMoney = (props) => {
  const { name, money } = props.user;
  const count = props.counts[props.id] || 0;
  return (
    <div className='user-money'>
      <h2>{name}</h2>
      <hr/>
      <p>Cach: ${Number(money).toFixed(4)}</p>
      <p>{props.id} {props.symbol}:  {count.toFixed(4)}</p>
    </div>
  );
}

export default UserMoney;