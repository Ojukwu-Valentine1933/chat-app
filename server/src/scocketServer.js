const {
  userJoin,
  getCurrentUser,
  userLeave,
  messageFormat,
} = require("./helpers/socketHelpers");

const listen = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
  
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);
      socket.emit("message", messageFormat("Admin", `Welcome to ${user.room}`));

      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          messageFormat("Admin", `${user.username} has joined the room`)
        );
    });

    //handle  chat message event from client

    socket.on("chatMessage", ({message, sender}) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit("message", messageFormat(sender, message));
    })

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      socket.broadcast
        .to(user?.room)
        .emit(
          "message",
          messageFormat("Admin", `${user.username} has left the chat`)
        );
    });
  });
};

module.exports = listen;
