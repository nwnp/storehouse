//3000, 3001번 포트를 사용하는 웹서버 2개를 동시에 실행해보세요

const http = require("http");

const server1 = http.createServer((req, res) => {
  console.log("server1 log");
});

server1.listen(3000);
server1.on("listening", () => {
  console.log("3000 port");
});

const server2 = http.createServer((req, res) => {
  console.log("server log2");
});

server2.listen(3001);
server2.on("listening", () => {
  console.log("3001 port");
});
