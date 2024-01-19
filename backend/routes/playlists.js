const express = require("express");
const router = new express.Router();
const { ensureLoggedIn } = require("../middlewares/auth");
const User = require("../models/user");
const Playlist = require("../models/playlists")



router.get("/:username/playlists", ensureLoggedIn, async function(req, res, next) {
  try {
    const playlists = await User.getUserPlaylists(req.params);
    return res.json({playlists});
  } catch(err) {
    return next(err)
  }
});


router.get("/:playlist/tracks",ensureLoggedIn, async function(req, res, next) {
  try {
    const tracks = await Playlist.getPlaylistTracks(req.body);
    return res.json({tracks})
  } catch(err) {
    return next(err)
  }
});


// Route to create a playlist in the database 
router.post("/playlists/:playlistName", ensureLoggedIn, async function(req, res, next) {
  try {
    const { playlistName } = req.params;
    const newPlaylist = await Playlist.createUserPlaylist(playlistName);
    return res.json({newPlaylist})
  }catch(err) {
    return next(err)
  }
})


router.post("/:username/:playlist/track",ensureLoggedIn, async function(req,res,next) {
  try{ 
    const {username, playlist} = req.params;
    const { track } = req.body
    const result = await Playlist.addTracks(username, playlist, track)
  }catch(error){
    return next(error)
  }
})


module.exports = router;