const express = require("express");
const reviewModel = require("./schema");

const router = express.Router();

router.get("/", async (req, res) => {
  const reviews = await reviewModel.find();
  res.send(reviews);
});

router.get("/:id", async (req, res) => {
  const review = await reviewModel.find({ elementId: req.params.id });
  res.send(review);
});

router.post("/", async (req, res) => {
  const newReview = await new reviewModel(req.body);
  newReview.save();
  res.send("Added sucessfully");
});

router.post("/:id", async (req, res) => {
  const newReview = await new reviewModel(req.body);
  newReview.save();
  res.send("Added sucessfully");
});

router.put("/:id", async (req, res) => {
  await reviewModel.findByIdAndUpdate(req.params.id, req.body);
  res.send("updated sucessfully");
});

router.delete("/:id", async (req, res) => {
  await reviewModel.findByIdAndDelete(req.params.id);
  res.send("Deleted sucessfully");
});

module.exports = router;
