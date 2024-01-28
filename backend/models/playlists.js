const db = require("../db");
const {NotFoundError, BadRequestError, DuplicateFoundError} = require("../expressError")



class Playlist {

  // Creates and adds a playlist to db
  static async createUserPlaylist(playlistName, image,  username) {
    const checkDuplicate = await db.query(`SELECT * FROM playlists WHERE name = $1`, [playlistName]);
    if(checkDuplicate) throw new DuplicateFoundError(`Playlist ${playlistName} already exists!`);
    const res = await db.query('INSERT INTO playlists (name, image, username_playlist) VALUES ($1, $2, $3) RETURNING id, name, image', [playlistName, image, username]);
    if(!res.rows.length) throw new NotFoundError();
    return res.rows[0]
  }


  // Adding track to a playlist using association table
  static async addTracks(playlistID, track) {
    const checkDuplicate = await db.query(`SELECT * FROM tracks WHERE id = $1`, [track.id]);
    console.log(track.id)
    if(checkDuplicate) throw new DuplicateFoundError();
    const newTrack = db.query
    (`INSERT INTO tracks (id, title, image_url,audio, playlist_id) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING title, image_url, audio`,
    [track.id, track.name, track.image, track.audio, playlistID]
    );


    const result = await db.query(
      `INSERT INTO playlists_tracks (track_id, playlist_id)
      VALUES ($1, $2)`,
      [track.id, playlistID]
    );
    console.log(newTrack);
    console.log(result);
    if(!result) throw new BadRequestError(`Could not add track to ${playlistID} playlist`);
    return newTrack.rows[0];
  }


  // Getting all the tracks of a playlist from db
  static async getPlaylistTracks(playlistID) {
    const result = await db.query(`SELECT id, title, image_url, audio FROM tracks 
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id 
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
    WHERE playlists.id = $1`, [playlistID]);
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