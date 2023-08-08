import React, { useState } from 'react';
import styles from '../styles/posts.module.scss';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faCheck, faPencil, faSearch, faTrash } from '../node_modules/@fortawesome/free-solid-svg-icons';

const PostsHome = ({ posts }) => {
  const router = useRouter();
  const [postsFilter, setPostsFilter] = useState(posts);

  const handleSearch = (e) => {
    const filtered = posts.filter((post) => { 
      return post.title.includes(e)
    });
    
    setPostsFilter(filtered);
  }

  return (
    <div>
      <div className={styles.search}>
        <input
          type="text"
          id="search"
          className={styles.searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
      </div>
      <div className={styles.postGrid}>
          
        {postsFilter.map(post => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postContent}>{post.content}</p>
            <p className={styles.postAuthor}>{post.user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default PostsHome;