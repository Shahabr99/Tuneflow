import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class tuneflowApi {
  
  // static token variable to get it updated
  static token;

  static async request(endpoint, data={}, method="get") {
    console.debug('API call:',endpoint, data, method)
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${tuneflowApi.token}`};
    const params = (method === "get") ? data : {};

    try {
      return (await axios({url, method, data, params, headers})).data;
    }catch(err) {
      console.error("API Error:", err.message)
      
      throw err;
    }
  }

  // Get current user info from database
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  // create new playlist 
  static async addPlaylist(username, data) {
    const res = await this.request(`playlists/${username}/addPlaylist`, data, "post");
    return res.playlist;
  }


  static async removePlaylist(data) {
    const res = await this.request(`playlists/removePlaylist`, data, "delete");
    return res.playlist;
  }


  // add tracks to playlist
  static async addTracks(username, playlistName, data) {
    const res = await this.request(`playlists/${username}/${playlistName}/addTrack`, data, "post");
    return res.track;
  }


  static async getPlaylists(username) {
    console.log(username)
    const res = await this.request(`playlists/${username}`);
    console.log(res)
    return res.playlists;
  }


// Getting tracks of a playlist
  static async getTracks(playlistName) {
    const res = await this.request(`playlists/${playlistName}/tracks`);
    return res.tracks;
  }


  static async login(data) {
   
    const res = await this.request(`auth/login`, data, "post");
    return res.token;
  }


  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
}


export default tuneflowApi;