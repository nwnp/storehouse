// 3000번 포트인 웹서버 하나를 만들어보세요!
const http = require("http");

http
  .createServer((req, res) => {
    console.log("server log");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>hello node</h1>");
    res.end("<p>hello server</p>");
  })
  .listen(3000, () => {
    console.log("wating for request at 3000");
  });
