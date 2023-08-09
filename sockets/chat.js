const chatSocket = (io) => io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);

    socket.emit('serverMessage', `Bem vindo ${username} a sala sobre ${room}`);

    socket.broadcast.to(room).emit('serverMessage', `${username} acabou de entrar na sala`);

    socket.on('roomClientMessage', ({ message }) => {
      io.to(room).emit('serverMessage', `${username}: ${message}`);
    });

    socket.on('typing', () => {
      socket.broadcast.to(room).emit('serverMessageTyping', `${username} is typing. . .`);
    });

    socket.on('stopTyping', () => {
      socket.broadcast.to(room).emit('serverMessageStopTyping', `${username} is typing. . .`);
    });

    socket.on('disconnect', () => {
      socket.broadcast.to(room).emit('serverMessage', `${username} saiu...`);
    });
  });
});

module.exports = chatSocket;