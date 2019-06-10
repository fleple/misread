import React from 'react';

import '../style/switch.scss';

const Switch = (props) => {
  return (
    <div className="switch">
      <input onChange={props.switchTheme} className="switch__input" type="checkbox" id="switchCheckbox"/>
      <label aria-hidden="true" className="switch__label" htmlFor="switchCheckbox">On</label>
      <div aria-hidden="true" className="switch__marker"></div>
    </div>
  )
}

export default Switch;