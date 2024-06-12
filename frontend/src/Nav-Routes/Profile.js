import  {useContext, useState} from 'react';
import "./Profile.css";
import DataContext from "../helpers/DataContext";


function Profile() {
    const {currentUser} = useContext(DataContext);
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        username: "",
        password: ""
    })


    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }


    function handleSubmit() {

    }



    return (
        <>
            {!currentUser ? 
                <div className='err'><p>No user found. Unauthorize access!</p></div> : 
                <div className='edit-form-container'>
                    <form onSubmit={handleSubmit} >
                        <div className="fields">
                            <label>Name: </label>
                            <input type='text' name='name' id='name' value={currentUser.name} onChange={handleChange} />
                        </div>
                        <div className="fields">
                            <label>Lastname: </label>
                            <input type='text' name='lastname' id='lastname' value={currentUser.lastname} onChange={handleChange} />
                        </div>
                        <div className="fields">
                            <label>Username: </label>
                            <input type='text' name='username' id="username" value={currentUser.username} onChange={handleChange} />
                        </div>
                        <div className="fields">
                            <label>Email: </label>
                            <input type='email' name='email' id='email' value={currentUser.email} onChange={handleChange} />
                        </div>
                        <div className="btns">
                            <button className="submit-btn" type='submit' onSubmit={handleSubmit}>Submit</button>
                            <a className='cancel-btn' href="/">Cancel</a>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Profile;