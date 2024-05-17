import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class tuneflowApi {
  
  // static token variable to get it updated
  static token;


  // Creates API requests based the arguments given 
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


  // Makes the request to the endpoint and gets current user info from database and returns it
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  // Sends the username and new playlist information to the backend and returns the new playlist 
  static async addPlaylist(username, data) {
    const res = await this.request(`playlists/${username}/addPlaylist`, data, "post");
    return res.newPlaylist;
  }


  // sends the information of the playlist that user wants to remove
  static async removePlaylist(data) {
    const res = await this.request(`playlists/removePlaylist`, data, "delete");
    return res.playlist;
  }


  // sends a tracks info to the backend and adds it to the playlist of the user
  static async addTrack(playlistID, data, username) {
    const res = await this.request(`playlists/${username}/${playlistID}/addTrack`, data, "post");
    return res;
  }


  // Fetches all the playlists of the current user based on the username from backend returns the playlists
  static async getPlaylists(username) {
    const res = await this.request(`playlists/${username}`);
    return res.playlists;
  }


  // Getting tracks of a playlist from the backend and returns the tracks to frontend
  static async getTracks(playlistID) {
    
    const res = await this.request(`playlists/${playlistID}/tracks`);
    
    return res.tracks;
  }


  // Sends the information of the user who want to login to backend for authentication and returns token
  static async login(data) {
    const res = await this.request(`auth/login`, data, "post");
    return res.token;
  }


  // sends the information of a new user to backend for registration and returns a token
  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
}


export default tuneflowApi;