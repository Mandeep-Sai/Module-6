const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    comment: String,
    rate: Number,
    elementId: String,
  },
  { timestamps: true }
);

const reviewModel = model("review", reviewSchema);
module.exports = reviewModel;
