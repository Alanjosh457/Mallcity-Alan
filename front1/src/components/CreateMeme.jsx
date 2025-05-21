import React, { useState } from 'react';
import styles from './CreateMeme.module.css';

const CreateMeme = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://mallcity-alan-backend.onrender.com/memes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        image_url: imageUrl,
        tags: tags.split(',').map(tag => tag.trim())
      })
    });
    const data = await response.json();
    if (response.ok) {
      onCreate(data);
      setTitle('');
      setImageUrl('');
      setTags('');
    } else {
      alert(data.error);
    }
  };

  return (
    <form className={styles.createForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meme Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Create Meme</button>
    </form>
  );
};

export default CreateMeme;
