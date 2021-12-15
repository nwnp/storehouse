const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");

app.set("port", process.env.PORT || 3000);

/** 모든 get 요청에서 미들웨어 실행하도록 등록하는 방법 */
// app.use((req, res, next) => {
//   // 모든 요청에서 다 실행 되도록 설정
//   console.log("모든 요청에서 다 실행됩니다.");
//   next();
// });

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
// 모든 get / 요청은 public 폴더에 있는 모든 파일에 접근 가능하도록 설정
// 정적 파일 접근을 가능하게 해줌
// -> 접근을 할 때에는 확장명까지 같이 적어줘야함

app.use(express.json());
// json으로 요청을 했을 때, 원래는 버퍼형식으로 받게 되는데 그대로 json에 담아주게 됨
app.use(express.urlencoded({ extended: false }));
// url을 잘 해줌
// form 요청이나, urlencoded 형식으로 보낸다고 하면 객체형식으로 받아줌
// app.use(cookieParser()); // 쿠키의 역할을 해줌

app.use(
  session({
    resave: false,
    saveUnintialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

/** 미들웨어를 변수에 담아서 변수를 할당해서 등록하는 방법 */
const middleware = (req, res, next) => {
  console.log("변수에 할당해서 미들웨어 실행");
  next();
};

app.get(
  /** 특정 요청에서만 미들웨어가 실행되도록 설정 */
  // get / 요청에서 실행
  "/",
  (req, res, next) => {
    console.log("get / 요청에서 실행됩니다");
    next();
  },
  (req, res) => {
    res.send("hello, express");
    console.log("express server log");
  }
);

app.get(
  /** 특정 요청에서만 미들웨어가 실행되도록 설정 */
  // get /test 요청에서 실행
  "/index",
  (req, res, next) => {
    console.log("get /index 요청에서 실행됩니다");
    next();
  },
  (req, res) => {
    // throw new Error("에러를 미들웨어에서");
    res.sendFile(path.join(__dirname, "./index.html"));
    // res.send("./test.html");
  }
);

app.get("/test", middleware, (req, res) => {
  res.sendFile(path.join(__dirname, "./test.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err.message);
});

const port = app.get("port");

app.listen(port, () => {
  console.log("3000번 포트에서 대기 중");
});
