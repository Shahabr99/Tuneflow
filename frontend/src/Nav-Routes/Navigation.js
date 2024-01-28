import {Link, NavLink} from "react-router-dom";
import React from 'react';
// import DataContext from "../helpers/DataContext";
import "./Navigation.css";


function Navigation(logout, user) {
  console.log(user)
  // const {currentUser} = useContext(DataContext)

  function loggedIn() {
    return (
      <ul>
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


  function loggedOut() {
    return (
      <ul>
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
      {user ? loggedIn() : loggedOut()}
    </nav>
  )
}

export default Navigation;