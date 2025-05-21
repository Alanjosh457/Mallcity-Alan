import React, { useEffect } from 'react';
import MemeCard from './MemeCard';
import styles from './MemeList.module.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function MemeList({ memes, onVote }) {
  // WebSocket: Listen for new bids
  useEffect(() => {
    
    socket.on('new_bid', ({ meme_id, user_id, credits }) => {
    onVote({
      id: meme_id,              // use `id` key here, NOT `_id`
      highest_bid: credits,
      highest_bidder: user_id,
    });
  });

  socket.on('vote-updated', ({ memeId, upvotes }) => {
    onVote({
      id: memeId,
      upvotes,
    });
  });

    return () => {
      socket.off('new_bid');
      socket.off('vote-updated');
    };
  }, [onVote]);

  if (!memes.length) return <p>No memes found.</p>;


return (
  <div className={styles.list}>
    {memes.map((meme) => (
      <MemeCard
        key={meme.id}
        meme={meme}
        onVote={onVote}
      />
    ))}
  </div>
);


}
