import React, { useState } from 'react';
import styles from '../styles/login.module.scss';
import { useRouter } from 'next/router';

const LoginForm = ({ message }) => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        router.push('/api');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className={styles.loginForm}>
      <h2>{ message }</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default LoginForm;