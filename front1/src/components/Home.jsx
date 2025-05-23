import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import MemeList from './MemeList';
import banner1 from '../images/banner.jpg';



function Home() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch('https://mallcity-alan-backend.onrender.com/memes')
      .then(res => res.json())
      .then(data => setMemes(data))
      .catch(err => console.error('Failed to fetch memes:', err));
  }, []);

  // Handle updated meme after voting




const handleVote = (updatedMeme) => {
  setMemes(prev =>
    prev.map(meme =>
      meme.id === updatedMeme.id // ✅ FIXED: use id, not _id
        ? { ...meme, ...updatedMeme }
        : meme
    )
  );
};

  
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>🔥 Dashboard</h2>
        <ul className={styles.menu}>
          <li>📊 Stats</li>
          <li>📅 Syllabus</li>
          <li>🧠 Analysis</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.heading}>r/Cyberpunkmemes</h1>
        </div>

        {/* Stats */}
        <section className={styles.stats}>
          <div className={styles.card}>
            <img src={banner1} />
            <div className={styles.placeholder}></div>
          </div>
         
          
        </section>

        {/* Meme Feed */}
        <section className={styles.feed}>
          <MemeList memes={memes} onVote={handleVote} />
        </section>
      </main>
    </div>
  );
}

export default Home;
