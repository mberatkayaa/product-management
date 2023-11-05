const express = require("express");

const dbHandler = require("../../util/dbHandler");
const Product = require("../../models/product");
const ResultBuilder = require("../../util/resultBuilder");
const wrapper = require("../../util/requestHandlerWrapper");
const Movement = require("../../models/movements");

const router = express.Router();

router.get("/", async (req, res) => {
  wrapper(async () => {
    const products = await dbHandler.getAll(Product);
    res.status(200).json(new ResultBuilder().ok().body(products).getObj());
  }, res);
});

router.get("/:prodId", async (req, res) => {
  wrapper(async () => {
    const product = await dbHandler.getById(Product, req.params.prodId);
    res.status(200).json(new ResultBuilder().ok().body(product).getObj());
  }, res);
});

router.get("/:prodId/movements", async (req, res) => {
  wrapper(async () => {
    const movements = await dbHandler.getMany(Movement, { "prod.prodId": req.params.prodId });
    res.status(200).json(new ResultBuilder().ok().body(movements).getObj());
  }, res);
});

router.post("/add", async (req, res) => {
  wrapper(async () => {
    await dbHandler.save(new Product(req.body.code, req.body.description, req.body.stock));
    res.status(200).json(new ResultBuilder().ok("Product added.").getObj());
  }, res);
});

router.patch("/edit/:prodId", async (req, res) => {
  wrapper(async () => {
    await dbHandler.save(new Product(req.body.code, req.body.description, req.body.stock, req.params.prodId));
    await dbHandler.editMany(Movement, { "prod.prodId": req.params.prodId }, { "prod.prodCode": req.body.code });
    res.status(200).json(new ResultBuilder().ok("Saves changed.").getObj());
  }, res);
});

router.delete("/delete/:prodId", async (req, res) => {
  wrapper(async () => {
    await dbHandler.deleteById(Product, req.params.prodId);
    await dbHandler.deleteMany(Movement, { "prod.prodId": req.params.prodId });
    res.status(200).json(new ResultBuilder().ok("Saves changed.").getObj());
  }, res);
});

module.exports = router;
