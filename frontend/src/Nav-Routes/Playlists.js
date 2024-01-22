import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../helpers/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import "./Playlists.css";


function Playlists() {
  const navigate = useNavigate();
  const { addPlaylist, requestPlaylists, deletePlaylist } = useContext(DataContext)
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
      return err
    }
  }

  // async function editCard(id) {
  //   try {
  //     const data = playlists.find(p => p.id === id);
  //     const result = await editPlaylist(data);
  //     if(result){
  //       setPlaylists(playlists.push(result))
  //     }
  //   }catch(err){
  //     return err
  //   }
  // }


  async function handleSubmit(e) {
    e.preventDefault();
    if(formData.playlistName.length === 0 || formData.image.length === 0) return;
    
    const newPlaylist = await addPlaylist(formData)
    setPlaylists([...playlists, newPlaylist]);
    setIsRendered(false);
    navigate("/playlists");
  }

  return (
      <div className="main-playlist">
        <div className="playlist-container">
          {isRendered ? "" : <div className='playlist-btn' onClick={showForm}><FontAwesomeIcon icon={faPlus} size='2x' /></div>}

          {playlists.length === 0 ? "Please create new playlist" : (
            playlists.map(p => (
            <div key={p.id} className="playlist-card">
              <div className='icon-box'>
                <div className='trash' onClick={() => deleteCard(p.id)}><FontAwesomeIcon icon={faTrash} /></div>
                <div className='edit'  ><FontAwesomeIcon icon={faPen} /></div>
              </div>
              <div className="playlist-img" style={{backgroundImage:`url(${p.image})`}}></div>
              <div>
                <h4>{`${p.name}`}</h4>
              </div>
            </div>
            ))
          )}
          {isRendered ? <div className={isRendered ? "dark" : ""}>
            <form>
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
                <button className='submit-btn' onClick={handleSubmit}>Submit</button>
                <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div> : ""}
          
        </div>
      </div>
  )
}

export default Playlists;
