import { userStopTyping, userTyping } from './sockets/socketsListernerFunctions.js';
import socket from './sockets/userSocket.js';
import { createMessage } from './utils/elementsHTML.js';
import { chatFormSubmit, typingRemove, typingVerification } from './utils/listenerFunctions.js';

const form = window.document.querySelector('form');
const inputMessage = window.document.querySelector('#messageInput');

form.addEventListener('submit', chatFormSubmit);

inputMessage.addEventListener('focus', typingVerification);

inputMessage.addEventListener('blur', typingRemove);

socket.on('serverMessage', createMessage);

socket.on('serverMessageTyping', userTyping);

socket.on('serverMessageStopTyping', userStopTyping);

window.onbeforeunload = () => {
  socket.disconnect();
};
