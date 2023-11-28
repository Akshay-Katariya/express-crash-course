const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const authSchema = require("../utils/validation_schema");
const User = require("../Models/Users.model");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const { email } = result;

    const doesUserExist = await User.findOne({ email: email });

    if (doesUserExist)
      throw createError.Conflict(`${email} is already been register`);

    const user = new User(result);
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    if (error.isJoi) {
      error.status = 422;
    }
    next(error);
  }
});

router.post("/login", (req, res) => {
  res.send("login route");
});

router.post("/refresh-token", (req, res) => {
  res.send("refresh-token route");
});

router.delete("/logout", (req, res) => {
  res.send("logout route");
});

module.exports = router;
