import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons
import "./AudioPlayer.css";

const AudioPlayer = ({playingTrack}) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const {image, audio} = playingTrack;
  
  
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
        </div>
      </div>
    </div>
  );
};


export default AudioPlayer;