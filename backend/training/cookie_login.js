const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const parseCookie = (cookie = "") => {
  // mycookie=test를 배열로 분해를 하기 위한 코드
  return cookie
    .split(",")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

const server = http
  .createServer(async (req, res) => {
    console.log("cookie", req.headers.cookie);
    const cookie = parseCookie(req.headers.cookie);
    const { name } = cookie;

    if (req.url.startsWith("/login")) {
      console.log("url:", req.url);
      const { query } = url.parse(req.url);
      console.log(query);
      const { name } = qs.parse(query);
      console.log(name);

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5); // 쿠키의 유효시간을 현재시간부터 5분까지 유효함

      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; httpOnly; path=/`,
      });
    } else if (cookie.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookie.name}, hello`);
    } else {
      try {
        const data = await fs.readFile("./cookie.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }

    res.end(`success ${name}`);
  })
  .listen(3000);

server.on("listening", () => {
  console.log("3000번 포트에서 로그인 서버 실행 중");
});
