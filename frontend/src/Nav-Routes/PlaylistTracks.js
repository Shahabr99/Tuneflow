import React, {useState, useEffect, useContext} from "react";
import DataContext from "../helpers/DataContext";

function PlaylistTracks() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const { requestTracks } = useContext(DataContext)

  useEffect(function getData() {
    async function getPlaylistTracks() {
      try{
        const result = await requestTracks()
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