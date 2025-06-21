const socket = io();
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

const peer = new Peer(USER_ID, {
  host: '/',
  port: '3000',
  path: '/peerjs'
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream);

  peer.on('call', call => {
    call.answer(stream); // Answer incoming calls
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', (userId, userName) => {
    connectToNewUser(userId, stream);
    appendMessage(`${userName} joined the class.`);
  });
});

peer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id, USER_NAME);
});

function connectToNewUser(userId, stream) {
  const call = peer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

// Chat functionality
const messageInput = document.getElementById('chatMessage');
const sendButton = document.getElementById('sendMessage');
const messages = document.getElementById('messages');

sendButton.addEventListener('click', () => {
  if (messageInput.value.length !== 0) {
    socket.emit('message', messageInput.value);
    appendMessage(`You: ${messageInput.value}`);
    messageInput.value = '';
  }
});

socket.on('createMessage', (message, userName) => {
  appendMessage(`${userName}: ${message}`);
});

function appendMessage(msg) {
  const messageElement = document.createElement('div');
  messageElement.innerText = msg;
  messages.append(messageElement);
}
