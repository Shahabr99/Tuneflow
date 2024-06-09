import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import DataContext from '../helpers/DataContext';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faMusic, faXmark } from '@fortawesome/free-solid-svg-icons';
import "./Playlists.css";


function Playlists() {
  const navigate = useNavigate();
  const { trackID } = useParams();
  const { addPlaylist, requestPlaylists, deletePlaylist, saveTrack } = useContext(DataContext)
  const [playlists, setPlaylists] = useState([]);
  const [failed, setFailed] = useState(false)
  const [isRendered, setIsRendered] = useState(false);
  const [formData, setFormData] = useState({
    playlistName: "",
    image: ""
  });


  // It will fetch all the playlists of the user if in database
  useEffect(() => {
    async function getData() {
      try{
        const playlists = await requestPlaylists();
        if(playlists.length > 0) {
          setPlaylists([...playlists])
        } else{
          throw new Error("No playlist found!")
        }
      }catch(e) {
        console.error(e.message)
    }
    }
    getData()
  }, [requestPlaylists]);


  // Checks if the playlist form is rendered or not
  function showForm() {
    setIsRendered(true);
  }

  // changes the state based on the values that user enters
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(data => ({
      ...data,
      [name]:value
    })
  )};

  // Closes the playlist form if user presses the cancel key
  function handleCancel() {
    setIsRendered(false);
    navigate("/playlists");
  }

  // Finds and deletes a playlist from the database based on the id of the playlist
  async function deleteCard(id) {
    try {
      const data = playlists.find(p => p.id === id);
      const result = await deletePlaylist(data);

      if(result.success) {
        setPlaylists(playlists.filter(p => p.id !== id));
        navigate("/playlists");
      }
    }catch(err){
      console.error("Error adding playlist:", err);
    }
  }

  // Gets the desired track and adds it to a playlist
  async function addTrack(id) {
    try {
      
      if(!trackID) {
        return
      } 

      // Gets a single track that user click on using the external API
      const trackData = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=c85b065b&format=jsonpretty&id=${trackID}`);
      
      const newTrack = trackData.data.results[0];
      
      const result = await saveTrack(id, newTrack);

      if (!result.success) {
        setFailed(true);
        return
      }else{
        navigate(`/${id}/playlist-tracks`);
      } 
      
    } catch(err) {
      console.error(err)
    }
  }



  function navigateToTracks(id) {
    navigate(`/${id}/playlist-tracks`)
  }


  function closeMessage(e) {
    const message = e.target.closest(".message");
    message.classList.remove("message");
    message.classList.add("nomessage");
    navigate("/playlists")
  }

  // Handles the user input for creating a new playlist
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(formData.playlistName.length === 0 || formData.image.length === 0) {
        console.error(`Not enough data`);
        return;
      }

      // sends new playlist data to backend and received the info of the created playlist
      const newPlaylist = await addPlaylist(formData);

      
      if(!newPlaylist) {
        setFailed(true);
        setIsRendered(false);
        return;
      }

      // Adds the new playlist to the user's playlists and navigates to playlists page
      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      setIsRendered(false);
      navigate("/playlists");
      
    } catch(err) {
      console.error(err)
    }
  }



  return (   
    <div className="main-playlist">
      <div className="playlist-container">
        {!trackID ? (
          isRendered ? (
            ""
          ) : (
            <>
              <div className='playlist-btn' onClick={showForm}>
                <FontAwesomeIcon icon={faPlus} size='2x' />
              </div>
              {playlists.length === 0 ? (
                <div>"Please create new playlist"</div>
              ) : (
                playlists.map(playlist => (
                  
                  <div className="playlist-card" key={playlist.id} onClick={() => navigateToTracks(playlist.id)}>
                    <div className='icon-box'>
                      <div className='trash' onClick={() => deleteCard(playlist.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                      <div className='edit'>
                        <FontAwesomeIcon icon={faPen} />
                      </div>
                      <Link className="tracks" to={`/${playlist.id}/playlist-tracks`}>
                        <FontAwesomeIcon icon={faMusic} />
                      </Link>
                    </div>
                    <div className="playlist-img" style={{backgroundImage:`url(${playlist?.image || ""})`}}></div>
                    <div>
                      <h4>{`${playlist.name}`}</h4>
                    </div>
                  </div>
                ))
              )}
            </>
          )
        ) : (
          playlists.length === 0 ? (
            "Please create new playlist"
          ) : (
            playlists.map(playlist => (
              <div className="playlist-card" key={playlist.id} onClick={() => addTrack(playlist.id)}>
                <div className='icon-box'>
                  <div className='trash' onClick={() => deleteCard( playlist.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                  <div className='edit'>
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <Link className="tracks" to={`/${playlist.id}/playlist-tracks`}>
                    <FontAwesomeIcon icon={faMusic} />
                  </Link>
                </div>
                <div className="playlist-img" style={{backgroundImage:`url(${playlist?.image || ""})`}}></div>
                <div>
                  <h4>{`${playlist.name}`}</h4>
                </div>
              </div>
            ))
          )
        )}
        {isRendered ? (
          <div className={isRendered ? "dark" : ""}>
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
                <button className = "submit-btn" type='submit' onClick={handleSubmit} >Submit</button>
                <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        ) : ""}
        {failed && <div className="message"><div className='x-icon' onClick={(e) => closeMessage(e)}><FontAwesomeIcon icon={faXmark} /></div><p>Duplicate found!💥</p></div>}
      </div>
    </div>
  );
  
}

export default Playlists;
