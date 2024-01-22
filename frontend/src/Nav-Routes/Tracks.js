import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import "./Tracks.css";
import DataContext from "../helpers/DataContext";



function Tracks() {
  const navigate = useNavigate();
  const {tracks} = useContext(DataContext);


  function handleClick(id) {

    navigate(`/tracks/${id}`)
  }


  return(
      <div className="container">
        {tracks.map(track => (
          <div  className="card" key={track.id} onClick={() => handleClick(track.id)} >
            <div style={{backgroundImage: `url(${track.image})`}} className="track-img"></div>
            <div className="lower-box">
              <h5>Title: {track.name}</h5>
              <span className="artist-name">Artist: {track.artist_name}</span>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Tracks;