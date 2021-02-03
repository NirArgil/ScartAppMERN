import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import React, { Fragment, useState } from "react";

import LOGOUT from "../../reducers/auth";
import  { loadUser } from "../../actions/auth";
import {login} from "../../actions/auth";
import PrivateRoute, {isAuthenticated} from "../routing/PrivateRoute";
import { logout } from "../../actions/auth";

export const Logout = ( props ) => {  


const onlogoutClick = async e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';  
    
  };  

  return (
    
    <div> { props.isAuthenticated ? ( <button type="button" class="logout btn btn-primary" onClick={e => onlogoutClick(e)}>
      Log Out
   </button> ) : ( null )}
  </div>

     
  )};
      
  Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(
    mapStateToProps,
    { logout }
  )(Logout);
