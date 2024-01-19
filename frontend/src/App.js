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



// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_ID = "tuneflow-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_ID)
  const [currentUser, setCurrentUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  


  useEffect(function loadUserInfo() {

    async function getCurrentUser() {
      if(token) {
        try {
          const {username} = jwt.decode(token);
         

          // Set the token in our API to make requests
          tuneflowApi.token = token;
          let currentUser = await tuneflowApi.getCurrentUser(username);
          console.log(currentUser);
          setCurrentUser(currentUser);

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


  useEffect(function getData() {
    async function getSongs() {
      try{
        const tracksData = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&limit=12&imagesize=300&boost=downloads_month`);
        setTracks(tracksData.data.results);
        console.log(tracksData.data.results)
      }catch(err) {
        console.error("Error fetching data:", err)
      }
    }
    getSongs();
  },[]);


  // Handles logging out 
  function logout() {
    setCurrentUser(null);
    setToken(null)
  }

  // 
  async function signup(signupData) {
    try {
      let token = await tuneflowApi.signup(signupData);
      setToken(token);
      return {success:true}
    }catch(err){
      console.error(err);
      return {success: false}
    }
  }


  async function login(loginData) {
    try {
      let token = await tuneflowApi.login(loginData);
      console.log(token)
      setToken(token);
      return {success: true}
    }catch(err) {
      console.error(`login failed`, err);
      return {success: false}
    }
  }


  if(!infoLoaded) return <LoadingSpinner />

  return (
    <div>
      <BrowserRouter>
        <DataContext.Provider value={{currentUser, login, signup, logout, tracks}}>
        
          <Navigation logout={logout} />
          <MainRoutes  />
        
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;
