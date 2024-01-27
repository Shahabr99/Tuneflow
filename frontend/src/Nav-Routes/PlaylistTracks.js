import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import DataContext from "../helpers/DataContext";

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const { requestTracks } = useContext(DataContext);
  const { trackid } = useParams();


  useEffect(function getData() {
    async function getPlaylistTracks() {
      try {
      
        const result = await requestTracks(trackid);
        console.log(result)
        setPlaylistTracks([...result]);
        console.log(playlistTracks)
      } catch(err) {
        console.error(err)
      }
    }
    getPlaylistTracks()
  });


  
  return (
    <div>
      {playlistTracks.map(track => (
        <div key={track.id} className="track-card">
          <h2>Here is the track.name</h2>
        </div>
      ))}
    </div>
  )
}

export default PlaylistTracks;