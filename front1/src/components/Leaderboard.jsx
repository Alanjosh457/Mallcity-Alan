import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('https://mallcity-alan-backend.onrender.com/memes/leaderboard');
      const data = await res.json();
      setMemes(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.leaderboard}>
      <h2>🏆 Meme Leaderboard</h2>
      <ul>
        {memes.map((meme, idx) => (
          <li key={meme.id}>
            <span className={styles.rank}>#{idx + 1}</span>
            <img src={meme.image_url} alt={meme.title} />
            <div>
              <h3>{meme.title}</h3>
              <p>{meme.upvotes} upvotes</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
