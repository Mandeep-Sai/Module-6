const express = require("express");
const productModel = require("./schema");
const q2m = require("query-to-mongo");

//

//

const router = express.Router();

router.get("/", async (req, res) => {
  const query = q2m(req.query);
  const products = await productModel
    .find()
    .limit(query.options.limit)
    .skip(query.options.skip)
    .sort(query.options.sort);
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.send(product);
});

router.post("/", async (req, res) => {
  const newProduct = await new productModel(req.body);
  newProduct.save();
  res.send("Added sucessfully");
});

router.put("/:id", async (req, res) => {
  await productModel.findByIdAndUpdate(req.params.id, req.body);
  res.send("updated sucessfully");
});

router.delete("/:id", async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.send("Deleted sucessfully");
});

module.exports = router;
