import { NextPage, NextPageContext } from 'next';
import styles from './index.module.scss';
import Head from 'next/head';
import PostsHome from '../components/posts-home';



// The component's props type
type PageProps = {
  error: {
    message: string,
    error: string,
    statusCode: number
  };
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};


const ErrorPage: NextPage<PageProps> = ({ error }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
        ERRO
    </div>
  );
}

ErrorPage.getInitialProps = async (ctx: PageContext) => {
  return {
    error: ctx.query.error,
  };
};


export default ErrorPage;
