import React from 'react';

const RuleCart = ({ title, text, imgSrc}) => (
  <div className='rule-cart'>
    <div className='wrap-img'>
      <img src={imgSrc} alt={imgSrc}/>
    </div>
    <h3>{title}</h3>
    <hr/>
    <p>{text}</p>
  </div>
);

export default RuleCart;