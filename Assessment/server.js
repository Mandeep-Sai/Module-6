const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use("/user", routes);
mongoose
  .connect("mongodb://localhost:27017/assessment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(3006, () => {
      console.log("working on port 3006");
    })
  );
