import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../helpers/DataContext";
import "./PlaylistTracks.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { requestTracks } = useContext(DataContext);
  const { playlistId } = useParams();


  // When component mounts, gets the tracks of a playlist from backend.
  useEffect(() => {
    async function getPlaylistTracks() {
      try {
        const result = await requestTracks(playlistId);

        if (result) {
          setPlaylistTracks(result);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getPlaylistTracks();
  }, [playlistId, requestTracks]);


  
  function handleClick(track) {
    setPlayingTrack(track);
    setIsPlaying(true);
  }



  return (
    <div className="main-cards">
      {playlistTracks.length === 0 ? 
        <div className="err">
          <p>No tracks are available in the playlist. Please visit the tracks page by clicking <a className="visit-tracks" href="/tracks">here 🎵</a>.</p>
          <FontAwesomeIcon className='close-mark' icon={faXmark} size='lg'  />
        </div> : ""
      }

      {playlistTracks.map((track) => 
      (
        <div
          key={track.track_id}
          className="playlist-track-card"
          onClick={() => handleClick(track)}
        >
          <div
            className="track-card-img"
            style={{ backgroundImage: `url(${track.image_url})` }}
          ></div>
          <div className="track-info-box">
            <h5>{track.title}</h5>
          </div>
        </div>
      ))}
      {playingTrack && (
        <div className="audio-control-bar">
          <audio
            className="audio-player"
            src={playingTrack.audio}
            controls
            autoPlay={isPlaying}
          ></audio>
        </div>
      )}
    </div>
  );
}

export default PlaylistTracks;
