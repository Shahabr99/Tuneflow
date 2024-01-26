import React, {useState, useEffect, useContext} from "react";
import TrackContext from "../helpers/DataContext";
import DataContext from "../helpers/DataContext";

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const { requestTracks } = useContext(DataContext);
  const { savedTrack } = useContext(TrackContext);
  console.log(savedTrack);



  useEffect(function getData() {
    async function getPlaylistTracks() {
      try {
        if(savedTrack) {
          playlistTracks.push(savedTrack)
        }
        const result = await requestTracks();
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