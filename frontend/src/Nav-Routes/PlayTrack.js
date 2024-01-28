import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import './PlayTrack.css';
import trackPlayer from "../images/home2160.mp4"
import DataContext from "../helpers/DataContext";
import AudioPlayer from "./AudioPlayer";


function PlayTrack() {
  const { tracks } = useContext(DataContext);
  const { trackID } = useParams();
  const playingTrack = tracks.find(t => t.id === trackID);

  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={trackPlayer} autoPlay loop muted/>
      <AudioPlayer playingTrack={playingTrack} />
    </div>
  );
}

export default PlayTrack;