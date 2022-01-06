const express = require("express");

const router = express.Router();

const { User } = require("../models");

router
  .get("/", (req, res) => {
    res.send("<h1>GET 방식 / </h1>");
  })
  .get("/:id", (req, res) => {
    // const { id } = req.param;
    console.log(`req.params.id: ${req.params.id}`);
    res.status(200).send(users);
  })
  .post("/", async (req, res, next) => {
    // console.log(req.url);
    // const userData = req.body;
    // console.log(`post body: ${JSON.stringify(userData)}`);
    try {
      const user = await User.create({
        name: req.body.name,
        description: req.body.description,
      });

      console.log(user);
      // res.status(201).json(user);
      res.send(user);
    } catch (err) {
      console.log("=============================");
      console.error(err);
      console.log("=============================");
      next(err);
    }

    // users.push(userData); // 임시 유저 추가
    // console.log(users);
    // res.send("post 실행");
  });
// .get("/like", (req, res) => {
//   res.send("like page");
// }); // like가 문자열이기 때문에 :id의 파라미터로 인식을 하고 /:id 라우팅이 됨

module.exports = router;
