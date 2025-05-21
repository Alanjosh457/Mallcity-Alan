const express = require('express');
const cors = require('cors');
require('dotenv').config();

const memesRouter = require('./routes/memes');
const bidsRouter = require('./routes/bids');

const app = express();
const http = require('http');
const { Server } = require('socket.io');

// Wrap app with HTTP server
const server = http.createServer(app);

// Init socket.io server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);


const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 🔁 Inject `io` into bid routes for WebSocket broadcasting
app.use('/bids', (req, res, next) => {
  req.io = io;
  next();
}, bidsRouter);


app.use('/memes', (req, res, next) => {
  req.io = io;
  next();
}, memesRouter);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('🟢 WebSocket connected');

  socket.on('disconnect', () => {
    console.log('🔴 WebSocket disconnected');
  });
});

// Start HTTP server with WebSocket support
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
