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


  useEffect(() => {
    async function getData() {
      const playlists = await requestPlaylists();
      console.log(playlists);
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
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newPlaylist = await addPlaylist(formData)
    setPlaylists([...playlists, newPlaylist]);
    setIsRendered(false);
    navigate("/playlists");
  }



  return (
    <div>
      <div className="container">
        {isRendered ? "": <button onClick={showForm}>New Playlist</button>}
        {playlists.length === 0 ? "Please create new playlist" : (
          playlists.map(p => (
          <div key={p.id} className="playlist-card">
            <div className="playlist-img" style={{backgroundImage:`url(${p.image})`}}></div>
            <div>
              <h4>{`${p.name}`}</h4>
            </div>
          </div>
          ))
        )};
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
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div> : ""}
      </div>
    </div>
  )
}

export default Playlists;
