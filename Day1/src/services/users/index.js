const express = require("express");
const userSchema = require("./schema");
const { response } = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userList = await userSchema.find({});
    res.send(userList);
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    res.send(user);
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const newUser = new userSchema(req.body);
    const response = await newUser.save();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await userSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send("Updated successfully");
  } catch (error) {}
});

router.delete("/:id", async (res, req) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.send("deleted");
  } catch (error) {}
});

module.exports = router;
