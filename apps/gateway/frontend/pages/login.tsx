import Head from 'next/head';
import LoginForm from '../components/login-form';
import { NextPage, NextPageContext } from 'next';

// The component's props type
type PageProps = {
  message: string;
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};


const Login: NextPage<PageProps> = ({ message }) => {
  return (
      <div>
        <Head>
          <title>Login Page</title>
          <meta name="description" content="Login Page" />
        </Head>
        <LoginForm message={message}/>
      </div>
  );
};

Login.getInitialProps = (ctx: PageContext) => {
  return {
    message: ctx.query.message,
  };
};

export default Login;
