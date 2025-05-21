const express = require('express');
const supabase = require('../supabaseClient');
const router = express.Router();

// Create meme
router.post('/', async (req, res) => {
  const { title, image_url, tags } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const meme = {
    title,
    image_url: image_url || 'https://picsum.photos/200',
    tags,
    upvotes: 0,
    caption: '',
    vibe: '',
  };

  const { data, error } = await supabase.from('memes').insert([meme]).select().single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});


// Get memes with highest bid info
router.get('/', async (req, res) => {
  const { data: memes, error } = await supabase
    .from('memes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  // Fetch highest bid for each meme
  const memesWithBids = await Promise.all(
    memes.map(async (meme) => {
      const { data: highestBidData, error: bidError } = await supabase
        .from('bids')
        .select('user_id, credits')
        .eq('meme_id', meme.id)
        .order('credits', { ascending: false })
        .limit(1)
        .single();

      return {
        ...meme,
        highest_bid: highestBidData?.credits || 0,
        highest_bidder: highestBidData?.user_id || 'None',
      };
    })
  );

  res.json(memesWithBids);
});


// Vote on meme (upvote or downvote)

// Vote on meme (upvote or downvote)
router.post('/:id/vote', async (req, res) => {
  const memeId = req.params.id;
  const { type } = req.body; // 'up' or 'down'
  const io = req.io; // get socket.io instance from middleware

  if (!['up', 'down'].includes(type)) {
    return res.status(400).json({ error: 'Invalid vote type' });
  }

  // Get current meme upvotes
  const { data: meme, error: fetchError } = await supabase.from('memes').select('upvotes').eq('id', memeId).single();

  if (fetchError) return res.status(404).json({ error: 'Meme not found' });

  const newUpvotes = type === 'up' ? meme.upvotes + 1 : meme.upvotes - 1;

  const { data, error } = await supabase.from('memes').update({ upvotes: newUpvotes }).eq('id', memeId).select().single();

  if (error) return res.status(500).json({ error: error.message });

  // Emit vote update event
  if (io) {
    io.emit('vote-updated', { memeId, upvotes: newUpvotes });
  }

  res.json(data);
});



router.get('/leaderboard', async (req, res) => {
  const top = parseInt(req.query.top) || 10;

  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .order('upvotes', { ascending: false })
    .limit(top);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});





module.exports = router;
