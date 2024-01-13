const express = require("express");
const router = new express.Router();
const {ensureLoggedIn} = require("../middlewares/auth");
const User = require("../models/user")



router.get("/:username",ensureLoggedIn, async function(req, res, next) {
  try{
    const {username} = req.params;
    const user = await User.get(username);
    return res.json({user})
  }catch(err) {
    return next(err)
  }
});


router.get("/:username/playlists",ensureLoggedIn, async function(req, res, next) {
  try {
    const result = await User.getUserPlaylists(req.params);
    console.log(result)
    return res.json(result)
  }catch(err) {
    return next(err)
  }
})


module.exports = router;