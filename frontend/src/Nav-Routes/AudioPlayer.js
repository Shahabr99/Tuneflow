import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons
import "./AudioPlayer.css";

const AudioPlayer = ({playingTrack}) => {
  console.log(playingTrack)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const {image, audio} = playingTrack;
  console.log(image, audio);
  
  function handlePlayPause() {
    if(isPlaying) {
      audioRef.current.pause();
    }else{
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }


  return (
    <div className="controller">
      <div style={{backgroundImage: `url(${image})`}} className="track-img"></div>
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
  );
};


export default AudioPlayer;