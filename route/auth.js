const router = require("express").Router();
const User = require("../models/User");

//register
router.post("/register", (req, res) => {
  res.send("did it againg");
});

module.exports = router;
