import { NextPage, NextPageContext } from 'next';

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
  post: Post;
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};


const PostDetailPage: NextPage<PageProps> = ({ post }) => {
  
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.user.email}</p>
      {/* Other post details */}
    </div>
  );
};

PostDetailPage.getInitialProps = async (ctx: PageContext) => {
  return {
    post: ctx.query.post,
  };
};


export default PostDetailPage;
