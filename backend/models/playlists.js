const db = require("../db");
const {NotFoundError, BadRequestError} = require("../expressError")



class Playlist {

  // Creates and adds a playlist to db
  static async createUserPlaylist(name, username) {
      const res = await db.query('INSERT INTO playlists (name, username_playlist) VALUES ($1, $2)', [name, username]);
      if(!res) throw new NotFoundError();
      return res.rows[0]
  }


  // Adding track to a plylist using association table
  static async addTracks(username, playlistName, track) {
    const newTrack = db.query(`INSERT INTO tracks (id, title, image_url, playlist_name) VALUES ($1, $2, $3, $4) RETURNING title, image_url, playlist_name`, [track.id, track.name, track.image, playlistName])  
    const result = await db.query(`INSERT INTO playlists_tracks (track_id, playlist_name) VALUES ($1, $2)`, [track.id, playlistName]);
    if(!result) throw new BadRequestError(`Could not add track to ${playlistName} playlist`);
    return newTrack.rows[0];
  }


  // Getting all the tracks of a playlist from db
  static async getPlaylistTracks(name) {
    const result = await db.query(`SELECT title, image_url FROM tracks 
    JOIN playlist_tracks ON tracks.id = playlists_tracks.track_id 
    JOIN playlists ON playlists.name = playlists_tracks.playlist_name
    WHERE playlists.name = $1`, [name]);
    if(!result) throw new NotFoundError(`No tracks found`);
    return result.rows[0]
  }
}


module.exports = Playlist;