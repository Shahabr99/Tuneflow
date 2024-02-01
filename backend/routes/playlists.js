const express = require("express");
const router = new express.Router();
const { ensureLoggedIn } = require("../middlewares/auth");
const User = require("../models/user");
const Playlist = require("../models/playlists");



router.get("/:username", ensureLoggedIn, async function(req, res, next) {
  try {
    const {username} = req.params;
    
    const playlists = await User.getUserPlaylists(username);
    return res.json({ playlists });
  } catch(err) {
    return next(err);
  }
});


// makes a request to the database to get all tracks of a specific playlist.
router.get("/:id/tracks", ensureLoggedIn, async function(req, res, next) {
  try {
    const { id } = req.params;
    const tracks = await Playlist.getPlaylistTracks(id);

    if(tracks.length === 0) return res.json({tracks:[]})

    return res.json({tracks});
  } catch(err) {
    return next(err);
  }
});


// Route to create a playlist in the database 
router.post("/:username/addPlaylist", ensureLoggedIn, async function(req, res, next) {
  try {
    const { username } = req.params;
    const { playlistName, image } = req.body;
    const newPlaylist = await Playlist.createUserPlaylist(playlistName, image, username);
    return res.json({ newPlaylist });
  }catch(err) {
    return next(err);
  }
})


// Route to add a track to playlist 
router.post("/:username/:playlistID/addTrack", ensureLoggedIn, async function(req,res,next) {
  try{ 
    const { username, playlistID } = req.params;
    console.log(username, playlistID)
    const newTrack  = req.body;
    console.log(`Line 55: Routes: ${newTrack.id} AND ${playlistID}`)
    const addedTrack = await Playlist.addTracks(playlistID, username, newTrack);
    console.log(`Line 57: Routes: ${addedTrack}`)
    return res.json(addedTrack);
  }catch(error){
    return next(error);
  }
})


// Route to delete a playlist
router.delete("/removePlaylist", ensureLoggedIn, async function(req, res, next) {
  try{
    const {name} = req.body;
    const playlist = await Playlist.removePlaylist(name);
    console.log(` DATABSE RETURNED: ${playlist}`)
    return res.json({playlist})
  }catch(err){
    return next(err)
  }
})


module.exports = router;