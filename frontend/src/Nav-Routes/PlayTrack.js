import React from "react";
import { useLocation } from 'react-router-dom';
import './PlayTrack.css';


function PlayTrack(trackID) {
  const location = useLocation();
  const {id, audio} = trackID;
  console.log(id, audio)

  return (
    <div className={location.pathname === `/track/${id}` ? 'video-box' : ''} >
      <video autoPlay loop muted id="video-bg">
        <source src="../images/home2160.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default PlayTrack;