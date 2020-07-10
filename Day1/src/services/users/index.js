const express = require("express");
const userModel = require("./schema");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userList = await userModel.find({});
    res.send(userList);
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.send(user);
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const response = await newUser.save();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated successfully");
  } catch (error) {}
});

router.delete("/:id", async (res, req) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.send("deleted");
  } catch (error) {}
});

module.exports = router;
