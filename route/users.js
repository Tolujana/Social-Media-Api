const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

//get a user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//update user
router.put('/:id/update', async (req, res) => {
  if (req.params.id === req.body.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcryptjs.genSalt(10);
        req.body.password = await bcryptjs.hash(req.body.password, salt);
      } catch (e) {
        e.message;
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (e) {
      console.error(e.message);
    }
  }
});

module.exports = router;
