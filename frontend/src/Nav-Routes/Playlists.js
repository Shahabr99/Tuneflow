import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../helpers/DataContext';


function Playlists() {
  const navigate = useNavigate();
  const { addPlaylist, requestPlaylists } = useContext(DataContext)
  const [playlists, setPlaylists] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [formData, setFormData] = useState({
    playlistName: "",
    image: ""
  });


  useEffect(function getAllPlaylists() {
    async function getData() {
      const playlists = await requestPlaylists();
      console.log(playlists);
      setPlaylists([...playlists])
    }
    getData()
  })

  

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
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newPlaylist = await addPlaylist(formData)
    setPlaylists(playlists.push(newPlaylist));
    setIsRendered(false);
    navigate("/playlists");
  }



  return (
    <div>
      <div className="container">
        <button onClick={showForm}>New Playlist</button>
        {isRendered ? <div className="playlist-form">
          <form>
            <div>
              <label>Playlist name:</label>
              <input type='text' id="playlist-name" name="playlistName" value={formData.playlistName} onChange={handleChange} />
            </div>
            <div>
              <label>Image link:</label>
              <input type="text" id="image-url" name="image" value={formData.image} onChange={handleChange} />
            </div>
            <div>
              <button onCLick={handleSubmit}>Submit</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div> : ""}
        { playlists.map(playlist => (
          <div className="playlist-card">
            <div className="playlist-img"></div>
            <div>
              <h4>`${playlist.name}`</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playlists;
