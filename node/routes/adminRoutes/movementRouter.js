const express = require("express");

const wrapper = require("../../util/requestHandlerWrapper");
const dbHandler = require("../../util/dbHandler");
const Movement = require("../../models/movements");
const ResultBuilder = require("../../util/resultBuilder");
const Product = require("../../models/product");

const router = express.Router();

router.get("/", (req, res) => {
  wrapper(async () => {
    const movements = await dbHandler.getAll(Movement);
    res.status(200).json(new ResultBuilder().ok().body(movements).getObj());
  }, res);
});

router.get("/:moveId", (req, res) => {
  wrapper(async () => {
    const movement = await dbHandler.getById(Movement, req.params.moveId);
    res.status(200).json(new ResultBuilder().ok().body(movement).getObj());
  }, res);
});

router.post("/add", (req, res) => {
  wrapper(async () => {
    const movement = new Movement(req.body.prod, req.body.description, req.body.numberOfIO);
    await dbHandler.save(movement);
    const product = await dbHandler.getById(Product, movement.prod.prodId);
    if (product) {
      product.stock += movement.numberOfIO;
      await dbHandler.save(product);
    }
    res.status(200).json(new ResultBuilder().ok("Movement added.").getObj());
  }, res);
});

module.exports = router;
