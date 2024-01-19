import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "../forms/LoginForm";
import RegistrationForm from '../forms/RegistrationForm';
import Homepage from './Homepage';
import Tracks from "./Tracks";
import PlayTrack from "./PlayTrack";

function MainRoutes() {

  return (
    <div>
      <Routes>
        
        <Route exact path="/" element={<Homepage />} />
     
        <Route exact path="/login" element={<LoginForm />} />
          
        <Route exact path="/register" element={<RegistrationForm />} />

        <Route exact path="/tracks" element={<Tracks />}  />

        <Route  path={`/tracks/:trackID`} element={<PlayTrack />} />

        <Route path="*" element={<Navigate to="/" />} />
          
      </Routes>
    </div>
  )
}


export default MainRoutes;


