import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons
import {Link} from "react-router-dom"
import "./AudioPlayer.css";

// Renders the player component that enables user to listen to music
const AudioPlayer = ({playingTrack}) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const {image, audio} = playingTrack;
  
  
  // User can play or pause music
  function handlePlayPause() {
    if(isPlaying) {
      audioRef.current.pause();
    }else{
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }



  return (
    <div className="audio-card">
      <div className="controller">
        <div style={{backgroundImage: `url(${image})`}} className="audio-img"></div>
        <audio ref={audioRef} src={audio} />
        <div className="btn-box">
          <button className="play"  onClick={handlePlayPause}>
            <FontAwesomeIcon icon={faPlay} size="2x" />
          </button>
          <button className="pause" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={faPause} size="2x" />
          </button>
          <Link to={`/playlists`} className="add-music"><FontAwesomeIcon icon={faPlus} size="2x"/></Link>
        </div>
      </div>
    </div>
  );
};


export default AudioPlayer;