const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  console.log("get / 요청");
  res.send("hello express");
});

module.exports = router;
