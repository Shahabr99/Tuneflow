import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "../forms/LoginForm";
import RegistrationForm from '../forms/RegistrationForm';
import Homepage from '../Homepage';
import Songs from "./Songs"

function MainRoutes() {



  return (
    <div>
      <Routes>
        
        <Route exact path="/" element={<Homepage />} />
     
        <Route exact path="/login" element={<LoginForm />} />
          
        <Route exact path="/register" element={<RegistrationForm />} />

        <Route exact path="/songs" element={<Songs />}  />

        <Route path="*" element={<Navigate to="/" />} />
          
      </Routes>
    </div>
  )
}


export default MainRoutes;


