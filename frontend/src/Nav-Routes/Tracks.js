import React, {useContext } from "react";
import {useNavigate, Link} from "react-router-dom";
import "./Tracks.css";
import DataContext from "../helpers/DataContext";



function Tracks() {
  const navigate = useNavigate();
  const { tracks } = useContext(DataContext);
  
  // Navigates the user to the music player page
  function handleClick(e, id) {
    e.stopPropagation();
    navigate(`/tracks/${id}`);
  };

  // takes the user to the existing playlist to choose from for adding the track
  function addTrack(e, track) {
    e.stopPropagation();
    navigate(`/${track.id}/playlists`)
  }


  return(
    <>
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
    </>
    );
};

export default Tracks;