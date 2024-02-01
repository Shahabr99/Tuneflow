const db = require("../db");
const {NotFoundError, BadRequestError, DuplicateFoundError} = require("../expressError")



class Playlist {

  // Creates and adds a playlist to db
  static async createUserPlaylist(playlistName, image,  username) {
    const checkDuplicate = await db.query(`SELECT * FROM playlists WHERE name = $1`, [playlistName]);
    console.log(`HERE IS THE DUPLICATE: ${checkDuplicate}`)

    if(checkDuplicate.rows.length > 0) throw new DuplicateFoundError(`Playlist ${playlistName} already exists!`);

    const res = await db.query('INSERT INTO playlists (name, image, username_playlist) VALUES ($1, $2, $3) RETURNING id, name, image', [playlistName, image, username]);
    if(!res.rows.length) throw new NotFoundError();
    return res.rows[0]
  }


  // Adding track to a playlist using association table
  static async addTracks(playlistID, username, track) {
    const checkDuplicate = await db.query(`SELECT * FROM tracks JOIN playlists p ON tracks.playlist_id = p.id WHERE tracks.id = $1 AND tracks.playlist_id = $2 AND p.username_playlist = $3`, [track.id, playlistID, username]);
    console.log(checkDuplicate)
    if(checkDuplicate.rows[0]) throw new DuplicateFoundError(`DUPLICATE FOUND IN THE DATABASE!`);


    const newTrack = await db.query
    (`INSERT INTO tracks (id, title, image_url,audio, playlist_id) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id,title, image_url, audio`,
    [track.id, track.name, track.image, track.audio, playlistID]
    );
    
    if(!newTrack.rows || newTrack.rows.length === 0) {
      throw new BadRequestError(`ADDING TO TRACKS FAILED`)
    }

    const result = await db.query(
      `INSERT INTO playlists_tracks (track_id, playlist_id)
      VALUES ($1, $2) RETURNING track_id, playlist_id`,
      [track.id, playlistID]
    );
    
    if(result.rows.length === 0) throw new BadRequestError(`Could not add track to ${playlistID} playlist`);
    console.log(`Line 43: models: ${newTrack}`)
    return newTrack.rows[0];
  }


  // Getting all the tracks of a playlist from db
  static async getPlaylistTracks(playlistID) {
    const result = await db.query(`SELECT tracks.id AS track_id, tracks.title, tracks.image_url, tracks.audio, playlists.id AS playlist_id
    FROM tracks 
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id 
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
    WHERE playlists.id = $1`, [playlistID]);
  
    if(!result) throw new NotFoundError(`No tracks found`);
    if(result.rows.length === 0) return []
    return result.rows;
  }

// Removing a playlist from db
  static async removePlaylist(name) {
    const result = await db.query(`DELETE FROM playlists WHERE name = $1 RETURNING id, name, image`, [name]);
    console.log(`DELETE RESULT: ${result.rows[0]}`)
    if(result.rows.length === 0) throw new NotFoundError(`No playlist found`);
    return result.rows[0];
  }
}


module.exports = Playlist;