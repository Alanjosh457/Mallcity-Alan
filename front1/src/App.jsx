import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import CreateMeme from './components/CreateMeme';

export default function App() {
  const [memes, setMemes] = useState([]);

  // Pass this handler to both Home and CreateMeme
  const handleCreate = (newMeme) => {
    setMemes(prevMemes => [newMeme, ...prevMemes]);
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: '20px', backgroundColor: '#121212', minHeight: '100vh', color: '#00ffea' }}>
        <Routes>
          <Route path="/" element={<Home memes={memes} setMemes={setMemes} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/create" element={<CreateMeme onCreate={handleCreate} />} />
        </Routes>
      </main>
    </>
  );
}
