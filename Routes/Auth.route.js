const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("register route");
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
