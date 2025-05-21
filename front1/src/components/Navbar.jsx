import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Cyberpunk Meme</h1>
      <div>
        <a href="/">Home</a> | <a href="/leaderboard">Leaderboard</a> | <a href="/create">Create Meme</a>
      </div>
    </nav>
  );
}
