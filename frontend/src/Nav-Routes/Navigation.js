import {Link, NavLink} from "react-router-dom";
import React, {useContext, useState} from 'react';
import DataContext from "../helpers/DataContext";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


function Navigation({logout}) {
  
  const {currentUser} = useContext(DataContext);
  const [ menuOpen, setMenuOpen ] = useState(false);
  

  function handleClick() {
    setMenuOpen(!menuOpen);
    console.log(menuOpen)
  }


  // Renders navbar if a user is logged in
  function loggedIn() {
    return (
      <ul className={!menuOpen ? "active" : "hidden"}>
        <li>
          <NavLink to="/tracks">
            Tracks
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists">
            Playlists
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            Profile
          </NavLink>
        </li>
        <li>
          <Link to="/" onClick={logout} >Logout</Link>
        </li>
      </ul>
    )
  }

  // renders a different navbar when user logs out
  function loggedOut() {
    return (
      <ul className={!menuOpen ? "active" : "hidden"}>
        <div className="bx">
          <FontAwesomeIcon icon={faBars} size="2x"/>
        </div>
        <li>
          <NavLink to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    )
  }


  return(
    <nav className="navbar">
      <Link className="logo" to="/">Tuneflow</Link>
      
      <FontAwesomeIcon 
        className= "active-icon"
        icon={faBars} 
        size="2xl" 
        style={{color: "#eff0f0", display: !menuOpen ? "block": "none"}}
        onClick={() => handleClick()}
      />

      <FontAwesomeIcon 
        className= "close-icon"
        icon={faX} 
        size="2xl" 
        style={{color: "#eff0f0", display: menuOpen ? "block": "none"}} 
        onClick={() => handleClick()} 
      />
      
      {currentUser ? loggedIn() : loggedOut()}
    </nav>
  )
}

export default Navigation;