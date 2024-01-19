import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import './PlayTrack.css';
import trackPlayer from "../images/home2160.mp4"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons
import DataContext from "../helpers/DataContext";



function PlayTrack() {
  // const [isPlaying, setIsPlaying] = useState(false);
  const { tracks } = useContext(DataContext);
  const { trackID } = useParams();
  console.log(trackID);
  const playingTrack = tracks.find(t => t.id === trackID);
  console.log(playingTrack)

  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={trackPlayer} autoPlay loop muted/>
      

      <div className="controller">
        <div style={{backgroundImage: `url(${playingTrack.image})`}} className="track-img"></div>
        <div className="btn-box">
          <button className="play"><FontAwesomeIcon icon={faPlay} size="2x" /></button>
          <button className="pause"><FontAwesomeIcon icon={faPause} size="2x" /></button>
        </div>
      </div>
    </div>
  );
}

export default PlayTrack;