const http = require("http");

const server = http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.end("cookie example");
  })
  .listen(3000);

server.on("listening", () => {
  console.log("3000 port");
});

server.on("error", (err) => {
  console.error(err);
});
