const express = require("express");
const router = new express.Router();
const { ensureLoggedIn } = require("../middlewares/auth");
const User = require("../models/user");
const Playlist = require("../models/playlists")



router.get("/:username", ensureLoggedIn, async function(req, res, next) {
  try {
    const playlists = await User.getUserPlaylists(req.params);
    return res.json({playlists});
  } catch(err) {
    return next(err)
  }
});


router.get("/:playlist/tracks", async function(req, res, next) {
  try {
    const tracks = await Playlist.getPlaylistTracks(req.body);
    return res.json({tracks})
  } catch(err) {
    return next(err)
  }
})


module.exports = router;