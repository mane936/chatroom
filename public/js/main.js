const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


//-----TODO----

const url = require("url") // dealing to import this with RequireJS.
// https://requirejs.org/docs/start.html#add

// Get username and room from URL
const _url = window.location.href; 
console.log(_url)  // we need to parse parameters with Node 
// https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_urlsearchparams_values
 
// ----

const socket = io(); 

// Message from server
socket.on('message', message => { //this is received by the client from the server. Only seen on client-side
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text from form input
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg)

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output messsage to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div);
}