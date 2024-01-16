import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from 'axios';
import "./Tracks.css";
import IDContext from "./IDContext";

function Tracks() {
  const [songs, setSongs] = useState([]);
  // const [artists, setArtists] = useState([]);
  const [trackData, setTrackData] = useState(null)
  // const [isHovered, setIsHovered] = useState(false)
  const history = useHistory();

  useEffect(function getData() {
    async function getSongs() {
      try{
        const tracksData = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&limit=12&imagesize=300&boost=downloads_month`);
        setSongs(tracksData.data.results);
        console.log(songs)
      }catch(err) {
        console.error("Error fetching data:", err)
      }
    }
    getSongs()
  },[]);


  return(
    <IDContext.Provider value={{trackData}} >
    <>
    
      <div className="container">
        {songs.map(song => (
            <Link key={song.id} to={`/tracks/${song.id}`} onClick={() => {
              setTrackData({id: song.id, audio: song.audio});
              history.push(`/tracks/${song.id}`)
            }}>
              <div  className="card" >
                <div style={{backgroundImage: `url(${song.image})`}} className="track-img"></div>
                <div className="lower-box">
                  <h5>Title: {song.name}</h5>
                  <span className="artist-name">Artist: {song.artist_name}</span>
                </div>
              </div>
            </Link>
          
          ))}
      </div>
      
    </>
    </ IDContext.Provider >
  )
}

export default Tracks;