import socket from '../sockets/userSocket.js';

export const { username, room } = Qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

if (!username || !room) {
  window.location.replace('/');
}

socket.emit('joinRoom', { username, room });

export default socket;