const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat.js')(io);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});