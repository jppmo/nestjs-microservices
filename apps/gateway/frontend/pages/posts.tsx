import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Posts from '../components/posts-grid';
import PostCreate from '../components/post-create';

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


const PostsPage: NextPage<PageProps> = ({ posts }) => {


  return (
    <div>
      <Head>
        <title>Posts Page</title>
        <meta name="description" content="Posts Page" />
      </Head>
        <PostCreate />
        <Posts posts={posts} />
    </div>
  );
};

PostsPage.getInitialProps = async (ctx: PageContext) => {
  return {
    posts: ctx.query.posts,
  };
};


export default PostsPage;
