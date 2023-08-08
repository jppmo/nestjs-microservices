import React, { useState } from 'react';
import styles from '../styles/posts.module.scss';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faCheck, faPencil, faTrash } from '../node_modules/@fortawesome/free-solid-svg-icons';

const Posts = ({ posts }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleDelete = async (postId) => {
    try {
      const response = await fetch('posts', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
  
      if (response.ok) {
        router.reload();
      } 
    } catch (error) {
      console.log(error);
    }

  };

  const handleUpdate = async (postId) => {
    try {
      
      const response = await fetch('posts', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ post: { id: postId, title, content } }),
      });
  
      if (response.ok) {
        router.reload();
      } 
      setIsEditing(false)
    } catch (error) {
      setIsEditing(false)
    }

  };

  return (
    <div className={styles.postGrid}>
       {posts && posts.map(post => (
        <div key={post.id} className={styles.post}>
          <button className={styles.postDeleteButton} onClick={() => { handleDelete(post.id) }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className={styles.postDeleteButton} onClick={ () => { setIsEditing(true) } }>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          {!isEditing ?
          <>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postContent}>{post.content}</p>
          </> 
          :
          <>
            <input
              type="text"
              id="title"
              placeholder={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              id="content"
              placeholder={post.content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className={styles.postDeleteButton} onClick={ () => { handleUpdate(post.id) } }>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </>
          }
          
        </div>
      ))}
    </div>
  );
};


export default Posts;