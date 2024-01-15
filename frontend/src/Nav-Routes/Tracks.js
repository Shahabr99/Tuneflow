import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import axios from 'axios';
import "./Tracks.css";

function Tracks() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([])

  useEffect(function getData() {
    async function getSongs() {
      try{
        const tracksData = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&limit=10&imagesize=300&boost=downloads_month`);
        const artistsData = await axios.get(`https://api.jamendo.com/v3.0/artists/?client_id=c85b065b&format=jsonpretty&limit=20&hasimage=true`);
        setSongs(tracksData.data.results);
        setArtists(artistsData.data.results);
        console.log(artistsData.data.results)
      }catch(err) {
        throw err
      }
    }
    getSongs()
  }, []);


  return(
    <>
      <div className="container">
        {songs.map(song => (
          <Link key={song.id} to={`/tracks/:${song.id}`}>
            <div  className="card">
              <div style={{backgroundImage: `url(${song.image})`}} className="track-img"></div>
              <div className="lower-box">
                <h5>Title: {song.name}</h5>
                <span className="artist-name">Artist: {song.artist_name}</span>
              </div>
            </div>
          </Link>
          ))}
      </div>

      <div className="container">
        {artists.map(artist => (
          <Link key={artist.id} to={`/artist/${artist.id}`}>
            <div  className="card">
              <div style={{backgroundImage: `url(${artist.image})`}} className="artist-img"></div>
              <div className="lower-box">
                <h5>Title: {artist.name}</h5>
              </div>
            </div>
          </Link>
          ))}
      </div>
    </>
  )
}

export default Tracks;