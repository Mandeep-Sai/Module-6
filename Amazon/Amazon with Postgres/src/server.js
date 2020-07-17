const express = require("express");
const cors = require("cors");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const { join } = require("path");
const mongoose = require("mongoose");
const db = require("../src/services/db");
const dotenv = require("dotenv");
dotenv.config();

const swaggerDocument = YAML.load(join(__dirname, "./apiDesc.yml"));
//Routes
const productsRoute = require("./services/products");
const reviewsRoutes = require("./services/reviews");
const imagesRoutes = require("./services/images");
const server = express();
server.use(cors());
server.use(express.json());

server.use("/products", productsRoute);

console.log(join(__dirname, "./apiDesc.yml"));
server.use("/reviews", reviewsRoutes);
server.use("/images", imagesRoutes);
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
mongoose
  .connect("mongodb://localhost:27017/amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(3006, () => {
      console.log("working on port 3006");
    })
  );
