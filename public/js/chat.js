const socket = window.io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

if (!username || !room) {
  location.replace('/')
}

socket.emit('joinRoom', { username, room });

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('stopTyping');

  if (inputMessage.value) {
    const { value: message } = inputMessage;
    socket.emit('roomClientMessage', { room, message });
    inputMessage.value = '';
  }
});

let timeOutId;

inputMessage.addEventListener('focus', () => {
  inputMessage.addEventListener('keypress', () => {
    socket.emit('typing');
  
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => socket.emit('stopTyping'), 500);
  });
});

inputMessage.addEventListener('blur', () => {
  inputMessage.removeEventListener('keypress', () => {
    socket.emit('typing');

    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => socket.emit('stopTyping'), 500);
  });
  socket.emit('stopTyping');
});

socket.on('serverMessage', (message) => createMessage(message));

socket.on('serverMessageTyping', (message) => {
  const messagesUl = document.querySelector('#messages');
  if (messagesUl.lastChild.innerText !== message) {
    createMessage(message);
  }
});

socket.on('serverMessageStopTyping', (message) => {
  const messagesUl = document.querySelector('#messages');
  if (messagesUl.lastChild.innerText === message) { 
    messagesUl.removeChild(messagesUl.lastChild); 
  }
});

window.onbeforeunload = () => {
  socket.disconnect();
};
