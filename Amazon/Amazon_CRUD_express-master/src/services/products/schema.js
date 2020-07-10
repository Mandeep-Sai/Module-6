const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    description: String,
    brand: String,
    imageUrl: String,
    price: Number,
    category: String,
  },
  { timestamps: true }
);

const productModel = model("product", productSchema);
module.exports = productModel;
