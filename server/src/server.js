const http = require("http");
const app = require("./app");
const listen = require("./scocketServer")
const httpServer = http.createServer(app);
const {Server} = require( 'socket.io'); 



const PORT = 3000;

const io = new Server(httpServer, {
    cors: {
    
        origin: "*",
    }
})

const startServer = async () => {
    listen(io);
httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
}

startServer();
