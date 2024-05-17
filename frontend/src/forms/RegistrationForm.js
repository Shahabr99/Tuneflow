import {useState, useContext} from "react";
import DataContext from "../helpers/DataContext";
import {Link, useNavigate} from "react-router-dom";


function RegistrationForm() {
  let navigate = useNavigate();
  
  const {signup} = useContext(DataContext)
  const [formData, setFormData] = useState({
    name:"",
    lastname: "",
    email: "",
    username:"",
    password:""
  })


  // Updates the registration form data State based on what user enters in the fields
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(data => ({...data, [name] : value}))
  }


  // handles data from the form and sends the information to backend //
  // If registred successfully, redirects to tracks page else throws error //
  async function handleSubmit(e) {
    e.preventDefault();
    
    const result = await signup(formData);
    if(result.success) {
      navigate("/tracks")
    }else{
      navigate("/");
      console.log("Duplicate user")
    }
  }


  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <label>Lastname:</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm;