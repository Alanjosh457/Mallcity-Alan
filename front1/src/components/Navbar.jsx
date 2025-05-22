import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Cyberpunk Meme</h1>
      <div>
        
       <Link to="/">Home</Link> | <Link to="/leaderboard">Leaderboard</Link> | <Link to="/create">Create Meme</Link>

      </div>
    </nav>
  );
}
