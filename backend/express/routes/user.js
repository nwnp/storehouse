const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.post("/", (req, res) => {
  // console.log(req.url);
  const data = JSON.stringify(req.body);
  console.log(`post body: ${data}`);
  res.send("post 실행");
});

module.exports = router;
