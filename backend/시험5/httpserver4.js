// Error 처리하는 웹서버를 하나 만들어보고
// 일부러 에러를 생성해보자!

const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      throw new Error();
    } catch (err) {
      const data2 = await fs.readFile("./error.html");
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data2);
    }
  })
  .listen(3000, () => {
    console.log("3000 port");
  });
