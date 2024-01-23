const db = require("../db");
const {NotFoundError, BadRequestError} = require("../expressError")



class Playlist {

  // Creates and adds a playlist to db
  static async createUserPlaylist(playlistName, image,  username) {
    
    const res = await db.query('INSERT INTO playlists (name, image, username_playlist) VALUES ($1, $2, $3) RETURNING id, name, image', [playlistName, image, username]);
    if(!res.rows.length) throw new NotFoundError();
    console.log(res.rows[0])
    return res.rows[0]
  }


  // Adding track to a plylist using association table
  static async addTracks(playlistName, track) {
    const newTrack = db.query(`INSERT INTO tracks (id, title, image_url,audio, playlist_name) VALUES ($1, $2, $3, $4, $5) RETURNING title, image_url, audio`, [track.id, track.name, track.image, track.audio, playlistName])  
    const result = await db.query(`INSERT INTO playlists_tracks (track_id, playlist_name) VALUES ($1, $2)`, [track.id, playlistName]);
    if(!result) throw new BadRequestError(`Could not add track to ${playlistName} playlist`);
    return newTrack.rows[0];
  }


  // Getting all the tracks of a playlist from db
  static async getPlaylistTracks(playlistName) {
    const result = await db.query(`SELECT title, image_url, audio FROM tracks 
    JOIN playlist_tracks ON tracks.id = playlists_tracks.track_id 
    JOIN playlists ON playlists.name = playlists_tracks.playlist_name
    WHERE playlists.name = $1`, [playlistName]);
    if(!result.rows.length) throw new NotFoundError(`No tracks found`);
    return result.rows;
  }

// Removing a playlist from db
  static async removePlaylist(name) {
    const result = await db.query(`DELETE FROM playlists WHERE name = $1 RETURNING id, name, image`, [name]);
    if(!result.rows.length) throw new NotFoundError(`No playlist found`);
    return result.rows[0];
  }
}


module.exports = Playlist;