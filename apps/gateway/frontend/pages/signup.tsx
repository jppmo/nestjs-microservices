// pages/signup.js
import Head from 'next/head';
import SignupForm from '../components/signup-form';

const Signup = () => {
  return (
    <div>
      <Head>
        <title>Sign Up Page</title>
        <meta name="description" content="Sign Up Page" />
      </Head>
      <SignupForm />
    </div>
  );
};

export default Signup;
