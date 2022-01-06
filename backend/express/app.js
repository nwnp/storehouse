const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 8080;

dotenv.config();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.use((req, res, next) => {
  console.log("모든 요청에서 다 실행됨");
  console.log(req.url, req.params, req.path);
  next();
});

app.use("/", indexRouter);
app.use("/", userRouter);
// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("post 실행");
// });

// 경로를 못 찾을때 실행됨
app.use((req, res, next) => {
  console.log("경로를 못 찾았을 때 실행됨");
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`${PORT}번에서 대기 중....`);
});
