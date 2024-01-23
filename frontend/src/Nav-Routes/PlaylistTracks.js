import React, {useState, useEffect} from "react";


function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(function getData() {
    async function getPlaylistTracks() {
      try{
        
      }catch(err){
        console.error(err)
      }
    }
    getPlaylistTracks()
  })


  return (
      <>

      </>
  )
}

export default PlaylistTracks;