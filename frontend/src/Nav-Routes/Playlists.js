import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DataContext from '../helpers/DataContext';
import TrackContext from '../helpers/TrackContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faMusic } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios'; 
import "./Playlists.css";


function Playlists() {
  const navigate = useNavigate();
  // const { trackID } = useParams();
  // console.log(trackID);
  const savedTrack  = useContext(TrackContext)
  const { addPlaylist, requestPlaylists, deletePlaylist, saveTrack } = useContext(DataContext)
  const [playlists, setPlaylists] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [formData, setFormData] = useState({
    playlistName: "",
    image: ""
  });


  useEffect(() => {
    async function getData() {
      const playlists = await requestPlaylists();
      playlists.length === 0 ? console.log("No playlists!") : setPlaylists([...playlists])
    }
    getData()
  }, [requestPlaylists]);


  function showForm() {
    setIsRendered(true);
  }


  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(data => ({
      ...data,
      [name]:value
    })
  )};


  function handleCancel() {
    setIsRendered(false);
    navigate("/playlists");
  }


  async function deleteCard(id) {
    try {
      const data = playlists.find(p => p.id === id);
      const result = await deletePlaylist(data);
      if(result) {
        setPlaylists(playlists.filter(p => p.id !== id))
      }
    }catch(err){
      console.error("Error adding playlist:", err)
    }
  }


  async function addTrack(id) {
    try {
      // const trackData = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&id=${trackID}`)

      const result = await saveTrack(id, savedTrack);
      if(result) {
        navigate(`/${id}/addTrack`)
      }else{
        console.error(`No track was added to database`)
      }
    }catch(err){
      console.error(err)
    }
  }



  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if(formData.playlistName.length === 0 || formData.image.length === 0) return console.error(`Not enough data`);
      const newPlaylist = await addPlaylist(formData);
      setPlaylists([...playlists, newPlaylist]);
      setIsRendered(false);
      navigate("/playlists");
      
    }catch(err){
      console.error(err)
    }
  }

  return (
      <div className="main-playlist">
        <div className="playlist-container">
          {isRendered ? "" : <div className='playlist-btn' onClick={showForm}><FontAwesomeIcon icon={faPlus} size='2x' /></div>}

          {playlists.length === 0 ? "Please create new playlist" : (
            playlists.map(playlist => (
              //  to={`/${playlist.id}/playlist-tracks`}
              <div className="playlist-card" key={playlist.id} onClick={() => addTrack(playlist.id)}>
                <div className='icon-box'>
                  <div className='trash' onClick={() => deleteCard(playlist.id)}><FontAwesomeIcon icon={faTrash} /></div>
                  <div className='edit'><FontAwesomeIcon icon={faPen} /></div>
                  <Link className="tracks" to={`/${playlist}/playlist-tracks`}><FontAwesomeIcon icon={faMusic} /></Link>
                </div>
                <div className="playlist-img" style={{backgroundImage:`url(${playlist?.image || ""})`}}></div>
                <div>
                  <h4>{`${playlist.name}`}</h4>
                </div>
              </div>
              
            ))
          )}
          {isRendered ? <div className={isRendered ? "dark" : ""}>
            <form onSubmit={handleSubmit}>
              <h3>Create your playlist: </h3>
              <div className='fields'>
                <label>Playlist name:</label>
                <input type='text' id="playlist-name" name="playlistName" value={formData.playlistName} onChange={handleChange} />
              </div>
              <div className='fields'>
                <label>Image link:</label>
                <input type="text" id="image-url" name="image" value={formData.image} onChange={handleChange} />
              </div>
              <div className='btns'>
                <button type='submit' onClick={handleSubmit} className='submit-btn' >Submit</button>
                <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div> : ""}
          
        </div>
      </div>
  )
}

export default Playlists;
