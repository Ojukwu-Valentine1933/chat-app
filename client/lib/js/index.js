const socket =  io("https://bubble-chat-api.onrender.com");

const url = new URL(location.href);
const room = url.searchParams.get( "room" );
const username = url.searchParams.get("username")

if (room && username) {
    socket.emit("joinRoom", {room, username});    
}


const messageList = document.getElementById("messages");

socket.on("message", (message) => {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML =
    message.sender === username
      ? `<div class="message own"> <h5 class="username_own"> ${
          message.sender === username ? "You" : message.sender
        } </h5> <div class="messageTop"> <p class="messageText"> ${
          message.message
        } </p></div> </div>`
      : `<div class="message"> <h5 class="username_other"> ${
          message.sender === username ? "You" : message.sender
        } </h5> <div class="messageTop"> <p class="messageText"> ${
          message.message
        } </p></div> </div>`;

  messageList.appendChild(messageDiv);
});

//send message to room

const chatForm = document.getElementById("form")
const chatInput =  document.getElementById("input");

const sendMessage = (event) => {
event.preventDefault();

    const message = chatInput.value;
    if (!message || message.trim().length <= 0) {
        return;
    }
const data = {message, sender: username}
     socket.emit("chatMessage", data);
     return (chatInput.value = "")
}

chatForm.addEventListener("submit", sendMessage)