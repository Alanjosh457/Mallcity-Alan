const express = require('express');
const supabase = require('../supabaseClient');
const router = express.Router();

router.post('/', async (req, res) => {
  const { meme_id, user_id, credits } = req.body;
  const io = req.io;


   console.log('req.io:', io);
  if (!meme_id || !user_id || credits == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }





 const { data: highestBidData, error: highestBidError } = await supabase
    .from('bids')
    .select('credits')
    .eq('meme_id', meme_id)
    .order('credits', { ascending: false })
    .limit(1)
    .single();

  if (highestBidError && highestBidError.code !== 'PGRST116') { // ignore no rows found error
    return res.status(500).json({ error: highestBidError.message });
  }

  if (highestBidData && credits <= highestBidData.credits) {
    return res.status(400).json({ error: 'Bid must be higher than current highest bid.' });
  }

  const bid = { meme_id, user_id, credits };

  const { data, error } = await supabase
    .from('bids')
    .insert([bid])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // 🔴 Broadcast to all connected clients
  io.emit('new_bid', {
    meme_id,
    user_id,
    credits,
  });

  res.status(201).json(data);
});

module.exports = router;
