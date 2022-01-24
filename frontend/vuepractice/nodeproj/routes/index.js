/* eslint-disable */

const express = require("express");
const logger = require("../lib/logger");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "jin's page" });
});

/* log test */
// lib 폴더에 있는 logger 모듈을 가져옴
router.get("/log-test", (req, res, next) => {
  // logger.error("this message is error");
  // logger.warn("this message is warn");
  // logger.info("this message is info");
  // logger.verbose("this message is verbose");
  // logger.silly("this message is silly");
  logger.debug(process.env.LOGGER_LEVEL);
  res.send("log test page");
});

module.exports = router;
