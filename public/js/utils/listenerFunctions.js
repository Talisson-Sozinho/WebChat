import socket, { room } from './user.js';

const inputMessage = window.document.querySelector('#messageInput');

export const chatFormSubmit = (e) => {
  e.preventDefault();

  socket.emit('stopTyping');
  
  if (inputMessage.value) {
    const { value: message } = inputMessage;
    socket.emit('roomClientMessage', { room, message });
    inputMessage.value = '';
  }
};

let timeOutId;

export const typingVerification = () => {
  inputMessage.addEventListener('keypress', () => {
    socket.emit('typing');
  
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => socket.emit('stopTyping'), 500);
  });
};

export const typingRemove = () => {
  inputMessage.removeEventListener('keypress', () => {
    socket.emit('typing');

    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => socket.emit('stopTyping'), 500);
  });
  socket.emit('stopTyping');
};

export default {
  chatFormSubmit,
};