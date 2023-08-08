import React, { useState } from 'react';
import styles from '../styles/post-create.module.scss';
import { useRouter } from 'next/router';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const response = await fetch('posts/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        router.reload();
      } 
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className={styles.postCreate}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputTitle}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.inputContent}
      />
      <button onClick={handleCreate} className={styles.createButton}>
        Create
      </button>
    </div>
  );
};

export default PostCreate;
