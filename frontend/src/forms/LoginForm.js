import React, {useState, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import DataContext from '../helpers/DataContext';
import "./LoginForm.css";



function LoginForm() {
  let navigate = useNavigate();
  const {login} = useContext(DataContext);
  const [formError, setFormError] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });


  // Gets the credentials and sends to backend for authentication //
  //if authentication is successful, redirects to the tracks page //
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(formData);
    if(result.success) {
      navigate("/tracks");
    }else{
      
      setFormError(true);
      return
    }
  }

  // handles data typed in the login form and changes the State form based on that //
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(data => ({...data, [name]:value}))
  }


  return (
    <div>
      
      <form onSubmit={handleSubmit} >
      {formError ? <p className='error-msg'>invalid username/password</p> : ""}
        <div>
          <label >Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="">
          <button type="submit">Submit</button>
          <Link to="/"><button>Cancel</button></Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm