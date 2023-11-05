const express = require("express");

const productRouter = require("./adminRoutes/productRouter");
const movementRouter = require("./adminRoutes/movementRouter");
const ResultBuilder = require("../util/resultBuilder");
const dbHandler = require("../util/dbHandler");
const User = require("../models/user");

const router = express.Router();

router.use("/", async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json(new ResultBuilder().error("Need authentication!").getObj());
  } else {
    const auth = JSON.parse(atob(req.headers.authorization.replace("Basic", "").trim()));
    const user = await dbHandler.getOne(User, { username: auth.user.name });
    if (!user || !user.authorized) {
      return res.status(401).json(new ResultBuilder().error("User doesn't have authorization!").body({ signOut: true }).getObj());
    }
    next();
  }
});

router.use("/products", productRouter);
router.use("/movements", movementRouter);

module.exports = router;
