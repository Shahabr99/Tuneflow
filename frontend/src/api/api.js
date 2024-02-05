import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://tuneflow-backend.onrender.com";


class tuneflowApi {
  
  // static token variable to get it updated
  static token;

  static async request(endpoint, data={}, method="get") {
    console.debug('API call:',endpoint, data, method)
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = endpoint === ["auth/register", "auth/login"].includes(endpoint) ? {} : { Authorization: `Bearer ${tuneflowApi.token}`};
    const headers = ["auth/register", "auth/login"].includes(endpoint) ? {} : { Authorization: `Bearer ${tuneflowApi.token}`};
    // const headers = { Authorization: `Bearer ${this.token}`};
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
    return res.newPlaylist;
  }


  static async removePlaylist(data) {
    const res = await this.request(`playlists/removePlaylist`, data, "delete");
    return res.playlist;
  }


  // add tracks to playlist
  static async addTrack(playlistID, data, username) {
    const res = await this.request(`playlists/${username}/${playlistID}/addTrack`, data, "post");
    return res;
  }


  static async getPlaylists(username) {
    const res = await this.request(`playlists/${username}`);
    return res.playlists;
  }


// Getting tracks of a playlist
  static async getTracks(playlistID) {
    
    const res = await this.request(`playlists/${playlistID}/tracks`);
    
    return res.tracks;
  }


  static async login(data) {
    const res = await this.request(`auth/login`, data, "post");
    console.log(res)
    return res.token;
  }


  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    console.log(res)
    return res.token;
  }
}


export default tuneflowApi;