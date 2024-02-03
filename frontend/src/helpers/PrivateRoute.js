// import React, {useContext} from "react";
// import {Outlet, useNavigate} from "react-router-dom";
// import DataContext from "../helpers/DataContext";


// function PrivateRoute() {
//   const {currentUser} = useContext(DataContext);
//   const navigate = useNavigate();
//   if(!currentUser) {
//     navigate("/login")
//   }else{
//     return (<Outlet />)
//   }
// }

// export default PrivateRoute;