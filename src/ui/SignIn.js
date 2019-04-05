import React, { useState } from 'react';
import { inject } from 'mobx-react';

const SignIn = (props) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    props.userStore.signIn({ name, email, password });
    props.close();
  }

  return (
    <form className='form' onSubmit={submit}>
      <input
        className='form-input'
        type='text'
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='form-input'
        type='email'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='form-input'
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='form-btn' type='submit'>Sign In</button>
    </form>
  )
}

export default inject('userStore')(SignIn);