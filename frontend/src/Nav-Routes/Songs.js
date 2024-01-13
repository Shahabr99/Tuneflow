import React, {useState, useEffect} from "react";
import axios from 'axios';
import "./Songs.css"

function Songs() {
  const [songs, setSongs] = useState([]);


  useEffect(function getData() {
    async function getSongs() {
      try{
        const res = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&limit=12&imagesize=300&boost=downloads_month`);
        setSongs(res.data.results)
      }catch(err) {
        throw err
      }
    }
    getSongs()
  }, [])


  return(
    <>
      <div className="container">
        {songs.map(song => (
          <div key={song.id} className="track-card">
            <div style={{backgroundImage: `url(${song.image})`}} className="track-img"></div>
            <h5>{song.name}</h5>
            <span>Artist: {song.artist_name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Songs;