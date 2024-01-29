import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../helpers/DataContext";
import "./PlaylistTracks.css";

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { requestTracks } = useContext(DataContext);
  const { playlistid } = useParams();

  useEffect(() => {
    async function getPlaylistTracks() {
      try {
        const result = await requestTracks(playlistid);
        if (result) {
          setPlaylistTracks(result);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getPlaylistTracks();
  }, [playlistid, requestTracks]);

  function handleClick(track) {
    setPlayingTrack(track);
    setIsPlaying(true);
  }

  return (
    <div className="main-cards">
      {playlistTracks.map((track) => (
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
