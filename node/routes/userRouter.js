const express = require("express");

const dbHandler = require("../util/dbHandler");
const User = require("../models/user");
const ResultBuilder = require("../util/resultBuilder");
const wrapper = require("../util/requestHandlerWrapper");

const router = express.Router();

router.post("/sign-in", (req, res) => {
  wrapper(async () => {
    const result = await dbHandler.getOne(User, { username: req.body.username, password: req.body.password, authorized: true });
    if (result) {
      return res
        .status(200)
        .json(new ResultBuilder().ok("User found.").body({ username: result.username, email: result.email }).getObj());
    }

    res.status(404).json(new ResultBuilder().error("User not found!").getObj());
  }, res);
});

module.exports = router;
