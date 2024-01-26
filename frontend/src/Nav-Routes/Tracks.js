import React, {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import "./Tracks.css";
import TrackContext from "../helpers/TrackContext";
import DataContext from "../helpers/DataContext";



function Tracks() {
  const navigate = useNavigate();
  const [savedTrack, setSavedTrack] = useState(null)
  const { tracks } = useContext(DataContext);
  

  function handleClick(e, id) {
    e.stopPropagation();
    navigate(`/tracks/${id}`);
  };


  function addTrack(e, track) {
    e.stopPropagation();
    setSavedTrack(track);
    navigate("/playlists")
  }


  return(
    <TrackContext.Provider value={savedTrack}>
      <div className="container">
        {tracks.map((track) => (
          <div  className="card" key={track.id} onClick={(e) => handleClick(e, track.id)} >
            <div style={{backgroundImage: `url(${track.image})`}} className="track-img"></div>
            <div className="card-lower-box">
              <h4>Title: {track.name}</h4>
              <h5 className="artist-name">Artist: {track.artist_name}</h5>
              <Link to={`/${track.id}/playlists`} className="playlist-link" onClick={(e) => addTrack(e, track)} >Add to playlist</Link>
            </div>
          </div>
        ))}
      </div>
    </TrackContext.Provider>
    );
};

export default Tracks;