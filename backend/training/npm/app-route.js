const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/user", userRouter);

app.set("port", 3000);

app.listen(app.get("port"), () => {
  console.log("3000번 포트에서 대기 중");
});
