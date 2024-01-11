import React, {useState, useEffect} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import tuneflowApi from "./api/api";
import jwt from "jsonwebtoken";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./Nav-Routes/Navigation";
import MainRoutes from "./Nav-Routes/MainRoutes";
import DataContext from "./helpers/DataContext";
import LoadingSpinner from "./common/LoadingSpinner";



// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_ID = "tuneflow-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_ID)
  const [currentUser, setCurrentUser] = useState(null);


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
        <DataContext.Provider value={{currentUser, login, signup, logout}}>
        
          <Navigation logout={logout} />
          <MainRoutes  />
        
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;
