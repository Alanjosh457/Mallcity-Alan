import React, { useState } from 'react';
import styles from './BidForm.module.css';

const Bidform = ({ memeId, onBidPlaced }) => {
  const [credits, setCredits] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://mallcity-alan-backend.onrender.com/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meme_id: memeId,
          user_id: userId,
          credits: parseInt(credits),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to place bid');
      } else {
        onBidPlaced();
        setCredits('');
        setUserId('');
        setShowModal(false);
      }
    } catch (err) {
      setError('Network error while placing bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className={styles.openButton} onClick={() => setShowModal(true)}>
        Place Bid
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              ✖
            </button>
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
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Bidform;
