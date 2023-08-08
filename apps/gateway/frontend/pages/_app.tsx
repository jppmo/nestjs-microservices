import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Layout from '../components/layout';
import ErrorBoundary from '../components/ErrorBoundary'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </>
  );
}

export default CustomApp;
