export const createMessage = (message) => {
const messagesUl = window.document.querySelector('#messages');
  const li = window.document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

export default {
  createMessage,
};