import React, { useEffect, useState } from 'react';
import styles from '../styles/layout.module.scss';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    if(router.pathname === '/api/login') {
      router.reload();
    } else {
      router.push('/api/login');
    }
  };

  useEffect(() => {
    const token = getCookie('token');
    console.log("TOKEN -TESTING ", token);
    setIsLoggedIn(token ? true : false);
  }, [])
  
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <ul>
          { isLoggedIn && <li><Link href="/api">Home</Link></li> }
          { !isLoggedIn && <li><Link href="/api/login">Login</Link></li> }
          { !isLoggedIn && <li><Link href="/api/signup">Signup</Link></li> }
          { isLoggedIn && <li><Link href="/api/posts">Posts</Link></li> }
          { isLoggedIn && <li className={styles.logoutNav}><button className={styles.logoutButton} onClick={handleLogout}>Logout</button></li> }
        </ul>
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
