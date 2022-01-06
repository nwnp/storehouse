const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // console.log(req.url, "routing");
  // res.send("<h1>Hello World!!!</h1>");
  try {
    const users = await User.findAll();
    // res.render("sequelize", { users });
    res.send(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
