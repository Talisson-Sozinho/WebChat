import { createMessage } from '../utils/elementsHTML.js';

export const userTyping = (message) => {
  const messagesUl = window.document.querySelector('#messages');
  if (messagesUl.lastChild.innerText !== message) {
    createMessage(message);
  }
};

export const userStopTyping = (message) => {
  const messagesUl = window.document.querySelector('#messages');
  if (messagesUl.lastChild.innerText === message) { 
    messagesUl.removeChild(messagesUl.lastChild); 
  }
};

export default {
  userTyping,
  userStopTyping,
};