import React,{useEffect, useState} from "react";
import axios from "axios";
import "./Homepage.css";

function Homepage() {
  const [artists, setArtists] = useState([])

  useEffect(function fetchData() {
    async function getArtists() {
      const res = await axios.get(`https://api.jamendo.com/v3.0/artists/?client_id=c85b065b&format=jsonpretty&limit=10`);
      setArtists(res.data.results)
    }
    getArtists()
  },[])


  return (
    <>
      <header>
        <div>
            <h1>Welcome to Tuneflow!</h1>
            <p>
              Welcome to Tuneflow, your gateway to a global symphony of sounds and melodies.<br />
              Immerse yourself in a world where talented artists from every corner of the globe<br /> 
              share their musical creations. Tune in to discover a diverse array of genres, from<br />
              soulful ballads to energetic beats, all crafted by passionate musicians.
            </p>
        </div>
        <div className="header-img"></div>
      </header>

      {artists.map(artist => 
        <div key={artist.id} className="artist-box" >
          <div style={{backgroundImage: `url(${artist.image})`}} className="artist"></div>
        </div>  
      )}
    
    </>
  )
}

export default Homepage;