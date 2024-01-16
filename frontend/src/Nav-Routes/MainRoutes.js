import React, {useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from "../forms/LoginForm";
import RegistrationForm from '../forms/RegistrationForm';
import Homepage from './Homepage';
import Tracks from "./Tracks";
import IDContext from "./IDContext";
import PlayTrack from "./PlayTrack";

function MainRoutes() {

  const trackID = useContext(IDContext)
  console.log(trackID)

  return (
    <div>
      <Routes>
        
        <Route exact path="/" element={<Homepage />} />
     
        <Route exact path="/login" element={<LoginForm />} />
          
        <Route exact path="/register" element={<RegistrationForm />} />

        <Route exact path="/tracks" element={<Tracks />}  />

        <Route  path={`/tracks/${trackID}`} element={<PlayTrack trackID={trackID} />} />

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
          
      </Routes>
    </div>
  )
}


export default MainRoutes;


