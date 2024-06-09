import React, {useState, useEffect} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import tuneflowApi from "./api/api";
import jwt from "jsonwebtoken";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./Nav-Routes/Navigation";
import MainRoutes from "./Nav-Routes/MainRoutes";
import DataContext from "./helpers/DataContext";
import LoadingSpinner from "./common/LoadingSpinner";
import axios from "axios";



// Key name for storing token in localStorage for re-login
export const TOKEN_ID = "tuneflow-token";



function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  

  useEffect(function loadUserInfo() {

    // Gets the current user's username based on the token
    async function getCurrentUser() {
      if(token) {
        try {
          const {username} = jwt.decode(token);


          // Set the token in our API to make requests
          tuneflowApi.token = token;

          // Gets user's information based on username from backend
          let currentUser = await tuneflowApi.getCurrentUser(username);
          
          setCurrentUser(currentUser);

        // throws an error if it doesn't find the user
        }catch(err) {
          console.error("Problem loading...", err);
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true)
    }

    setInfoLoaded(false)
    getCurrentUser()
  }, [token]);


  // Gets the tracks information from the external API
  useEffect(function getData() {
    async function getSongs() {
      try{
        const tracksData = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&limit=16&imagesize=300&boost=downloads_month`);
        setTracks(tracksData.data.results);
        
      }catch(err) {
        console.error("Error fetching data:", err)
      }
    }
    getSongs();
  },[]);


  // Handles logging out 
  function logout() {
    setCurrentUser(null);
    setToken(null);

    localStorage.removeItem(TOKEN_ID)
  }


  // Handles registration of a user.
  async function signup(signupData) {
    try {

      // sends the information of the user to the backend 
      // receives a token and assigns it to the token State.
      let apiToken = await tuneflowApi.signup(signupData);
      setToken(apiToken);
      return {success:true}
    }catch(err){
      console.error(err);
      return {success: false}
    }
  }


  // Handles users logins 
  async function login(loginData) {
    try {

      // sends the username and password to backend and receives a token after authentication
      let apiToken = await tuneflowApi.login(loginData);

      setToken(apiToken);
      return {success: true}

    }catch(err) {
      console.error(`login failed`, err);
      return {success: false}
    }
  }

  // Sends the new playlist information to backend and receives the playlist info
  async function addPlaylist(playlistData) {
    try {
      const playlist = await tuneflowApi.addPlaylist(currentUser.username, playlistData);
      return playlist;
    }catch(err){
      return {success: false};
    }
  };


  // Gets all the playlists of the current user
  async function requestPlaylists() {
    try{
      const playlists = await tuneflowApi.getPlaylists(currentUser.username);
      return playlists;
    }catch(err){
      return {success: false}
    }
  };



// Handles removing a playlist from db
  async function deletePlaylist(data) {
    try {
      const result = await tuneflowApi.removePlaylist(data);
      if(result) return {success: true}
    }catch(err){
      return {success: false}
    }
  }


  // async function editPlaylist() {
  //   try {
  //     const newPlaylist = 
  //   }catch(err) {
  //     return {success: false}
  //   }
  // }

  // sends the info of user, track and playlist to backend to add a new music to a playlist
  async function saveTrack(playlistID, data) {
    try {
      const track = await tuneflowApi.addTrack(playlistID, data, currentUser.username);
      if(track) return {success: true}
    } catch(err) {
      return {success: false}
    }
  };


  // Gets all the tracks of a plylist based on the playlist id
  async function requestTracks(playlistID) {
    try {
      const tracks = await tuneflowApi.getTracks(playlistID);

      return tracks;
    }catch(err){
      return {success: false}
    }
  }

  // If there is no user info loaded, shows the spinner
  if(!infoLoaded) return <LoadingSpinner />

  return (
    <div>
      <BrowserRouter>
        <DataContext.Provider value={{
          currentUser,
           login,
            signup,
             logout,
              tracks,
               addPlaylist,
                requestPlaylists,
                 saveTrack,
                  requestTracks,
                   deletePlaylist,
          }}>
        
          <Navigation logout={logout} />
          <MainRoutes  />
          
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;
