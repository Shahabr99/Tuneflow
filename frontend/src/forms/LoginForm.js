import React, {useState, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import DataContext from '../helpers/DataContext';
import "./LoginForm.css";

// import Alert from "../common/Alert";

function LoginForm() {
  let navigate = useNavigate();
  const {login} = useContext(DataContext);
  const [formError, setFormError] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(formData);
    console.log(result)
    if(result.success) {
      navigate("/tracks");
    }else{
      // navigate("/")
      setFormError(true);
      return
    }
  }


  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(data => ({...data, [name]:value}))
  }


  return (
    <div>
      
      {/* {formErrors.length ? <Alert messages={formErrors} /> : null } */}
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