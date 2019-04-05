import React from 'react';

import '../style/not_found.scss';

import suicide from '../assets/suicide.png';

const NotFound = () => (
  <div className='container-404'>
    <div className='wrap-img'>
      <img src={suicide} alt='pepe dead'/>
    </div>
    <h2 className='title'>
      <span className='no-404'>404</span><br/>
      Page Not Found
    </h2>
  </div>
);

export default NotFound;
