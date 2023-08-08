import { NextPage, NextPageContext } from 'next';
import styles from './index.module.scss';
import Head from 'next/head';
import PostsHome from '../components/posts-home';


export interface Post {
  id: number;
  title: string;
  content: string;
  user: User | undefined;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// The component's props type
type PageProps = {
  posts: Post[];
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};


const Index: NextPage<PageProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
        <PostsHome posts={posts} />
    </div>
  );
}

Index.getInitialProps = async (ctx: PageContext) => {
  return {
    posts: ctx.query.posts,
  };
};


export default Index;
