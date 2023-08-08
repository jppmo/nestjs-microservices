// components/SignupForm.js
import React, { useState } from 'react';
import styles from '../styles/signup-form.module.scss';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      router.push('/api/login');
    } else {
      console.log("nada");
    }
  };

  return (
    <div className={styles.signupForm}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
