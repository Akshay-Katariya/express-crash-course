const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const validateEmail = require("../utils/GlobalUtils");
const User = require("../Models/Users.model");

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw createError.BadRequest();

    const doesUserExist = await User.findOne({ email });

    if (doesUserExist)
      throw createError.Conflict(`${email} is already been register`);

    const user = new User({ email, password });
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
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
