/* eslint-disable */

const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const departmentService = require("../service/departmentService");

router.post("/", async (req, res, next) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };

    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    if (!params.name) {
      const err = new Error("Not allowed (name)");
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    const result = await departmentService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`department.js error`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
