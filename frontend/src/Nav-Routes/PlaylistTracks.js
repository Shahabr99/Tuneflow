import React, {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import DataContext from "../helpers/DataContext";
import "./PlaylistTracks.css";

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const { requestTracks } = useContext(DataContext);
  const { playlistid } = useParams();
  const navigate = useNavigate();


  useEffect(function getData() {
    async function getPlaylistTracks() {
      try {
        const result = await requestTracks(playlistid);
        console.log(result)
        setPlaylistTracks(result);
      } catch(err) {
        console.error(err)
      }
    }
    getPlaylistTracks()
  }, [playlistid, requestTracks]);


  function handleClick() {

  }


  
  return (
    <div className="main-cards">
      {playlistTracks.map(track => (
        <div key={track.id} className="playlist-track-card" onClick={() => handleClick()} >
          <div className="track-card-img" style={{backgroundImage:`url(${track.image_url})`}} ></div>
          <div className="">
            <h5>{track.title}</h5>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlaylistTracks;