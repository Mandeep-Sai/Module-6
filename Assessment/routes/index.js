const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("./schema");

router.post("/", async (req, res) => {
  const user = await new userModel(req.body);
  await user.save();
  res.send(user);
});

router.post("/sendemail", async (req, res) => {
  const emails = await userModel.find();
  //
});

module.exports = router;
