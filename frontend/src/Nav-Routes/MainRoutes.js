import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "../forms/LoginForm";
import RegistrationForm from '../forms/RegistrationForm';
import Homepage from './Homepage';
import Tracks from "./Tracks";
import PlayTrack from "./PlayTrack";
import Playlists from "./Playlists";
import PlaylistTracks from "./PlaylistTracks";
import Profile from "./Profile";

// Renders the component based on the route
function MainRoutes() {


  return (
    <div>
      <Routes>
        
        <Route exact path="/" element={<Homepage />} />

        <Route exact path="/login" element={<LoginForm />} />
          
        <Route exact path="/register" element={<RegistrationForm />} />

        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/tracks" element={<Tracks />}  />
    
        <Route path="/tracks/:trackID" element={<PlayTrack />} />
      
        <Route path="/playlists"  element={<Playlists />}/>
      
        <Route path="/:trackID/playlists" element={<Playlists />} />

        <Route path="/playlists/:playlistId/add-track" element={<PlaylistTracks />} />
        
        <Route path="/playlists/:playlistId/tracks" element={<PlaylistTracks />} />

        {/* Any route except the defined ones above, navigates the user to homepage */}
        <Route path="*" element={<Navigate to="/" />} />  

      </Routes>
    </div>
  )
}


export default MainRoutes;


