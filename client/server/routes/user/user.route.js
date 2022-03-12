const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({ data: "hey from user api" });
});

module.exports = router;
