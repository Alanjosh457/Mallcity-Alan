import React, { useState } from 'react';
import styles from './BidForm.module.css';

const Bidform = ({ memeId, onBidPlaced }) => {
  const [credits, setCredits] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://https://mallcity-alan-backend.onrender.com/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meme_id: memeId, user_id: userId, credits: parseInt(credits) }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to place bid');
      } else {
        onBidPlaced();
        setCredits('');
        setUserId('');
      }
    } catch (err) {
      setError('Network error while placing bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Credits"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        required
        disabled={loading}
        min="1"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Placing bid...' : 'Place Bid'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Bidform;
