import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import DataContext from "../helpers/DataContext";
import "./PlaylistTracks.css";

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [progress, setProgress] = useState(0);
  const { requestTracks } = useContext(DataContext);
  const { playlistid } = useParams();
  


  useEffect(function getData() {
    async function getPlaylistTracks() {
      try {
        const result = await requestTracks(playlistid);
        if(result) {
          setPlaylistTracks(result);
        }
      } catch(err) {
        console.error(err)
      }
    }

    getPlaylistTracks();
  }, [playlistid, requestTracks]);


 
  

  function handleClick(track) {
    // const audioPlayer = document.getElementById("audio-player");
    // const sourceElement = document.querySelector(".track-source");
    // console.log(track.audio)
    // sourceElement.setAttribute("src", track.audio);
    // audioPlayer.load(); // Reload the audio element to apply the new source
    // audioPlayer.play(); // Start playing the new source
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
        <audio id="audio-player" controls autoPlay={isPlaying}>
          <source className="track-source" src={`${playingTrack.audio}`}></source>
        </audio>
      </div>
    )}
  </div>
  );
}

export default PlaylistTracks;