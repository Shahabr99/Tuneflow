const express = require("express");
const router = new express.Router();
const { ensureLoggedIn } = require("../middlewares/auth");
const User = require("../models/user");
const Playlist = require("../models/playlists");



router.get("/:username/playlists", ensureLoggedIn, async function(req, res, next) {
  try {
    const playlists = await User.getUserPlaylists(req.params);
    return res.json({ playlists });
  } catch(err) {
    return next(err)
  }
});

// makes a request to the database to get all tracks of a specific playlist.
router.get("playlists/:playlist/tracks", ensureLoggedIn, async function(req, res, next) {
  try {
    const tracks = await Playlist.getPlaylistTracks(req.body);
    return res.json({tracks})
  } catch(err) {
    return next(err)
  }
});


// Route to create a playlist in the database 
router.post("/:username/playlists/addTrack", ensureLoggedIn, async function(req, res, next) {
  try {
    const { username } = req.params;
    const { playlistName } = req.body;
    const newPlaylist = await Playlist.createUserPlaylist(playlistName, username);
    return res.json({ newPlaylist })
  }catch(err) {
    return next(err)
  }
})


// Route to add a track to playlist 
router.post("/:username/:playlist/addTrack", ensureLoggedIn, async function(req,res,next) {
  try{ 
    const { username, playlist } = req.params;
    const { track } = req.body;
    const addedTrack = await Playlist.addTracks(username, playlist, track);
    return res.json({addedTrack})
  }catch(error){
    return next(error)
  }
})


module.exports = router;