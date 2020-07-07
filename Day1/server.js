const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./src/services/users");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/users", userRoutes);
mongoose
  .connect("mongodb://localhost:27017/strive_books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(3001, () => {
      console.log("server running on 3001");
    })
  );
