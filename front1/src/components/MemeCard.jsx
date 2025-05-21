import React from 'react';
import styles from './MemeCard.module.css';
import VoteButtons from './VoteButtons';
import Bidform from './Bidform';

export default function MemeCard({ meme, onVote }) {
  return (
    <div className={styles.card}>
      <h3>{meme.title}</h3>
      <img src={meme.image_url} alt={meme.title} className={styles.image} />
      <p>Upvotes: {meme.upvotes}</p>
      <p>Tags: {meme.tags?.join(', ') || 'None'}</p>
      <p className={styles.caption}><em>{meme.caption || 'No caption yet'}</em></p>

      <VoteButtons memeId={meme.id} onVote={onVote} />

      <p>Highest Bid: {meme.highest_bid || 0}</p>
      <p>Highest Bidder: {meme.highest_bidder || 'None'}</p>

      <Bidform memeId={meme.id} />
    </div>
  );
}
