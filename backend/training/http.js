const http = require("http");

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>hello node</h1>");
    res.end("<p>hello server</p>");
  })
  .listen(8081, () => {
    console.log("waiting for reqeust at 8081");
  });
