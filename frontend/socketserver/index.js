const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();

const io = require("socket.io")(httpServer, {
  // CORS 처리
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// socket.io 연결
io.on("connection", (socket) => {
  console.log('connected socket.io', socket.id);

  socket.on('chat', msg => {
    console.log('chat', msg);
    io.emit('chat', msg);
  });
});

// http서버 실행
const port = 3010;
httpServer.listen(port);
console.log(`socket.io listening: ${port}`);
