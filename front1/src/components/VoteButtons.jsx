import React from 'react';
import styles from './VoteButtons.module.css';

const VoteButtons = ({ memeId, onVote }) => {
  const vote = async (type) => {
    try {
      const res = await fetch(`http://localhost:4000/memes/${memeId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }), // 'up' or 'down'
      });

      if (res.ok) {
        const updatedMeme = await res.json();
        onVote(updatedMeme); // Pass updated meme back to parent
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Vote failed');
      }
    } catch (error) {
      alert('Network error while voting');
    }
  };

  return (
    <div className={styles.buttons}>
      <button onClick={() => vote('up')}>⬆ Upvote</button>
      <button onClick={() => vote('down')}>⬇ Downvote</button>
    </div>
  );
};

export default VoteButtons;
