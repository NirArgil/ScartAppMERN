import { connect, Provider } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import React, { Fragment, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import  { loadUser } from "../../actions/auth";
import {login} from "../../actions/auth";
import { logout } from "../../actions/auth";
import * as auth from "../../reducers/auth";
import combineReducers from "../../reducers/index";
import store from "../../store";

import styled from 'styled-components';

export const Wrapper = styled.div`

.LogoutBtn {
  display: inline-block
}

.Dash {
  margin-right: 5px;
  display: inline-block
}

`;

export const Logout = ( ) => {  

const dispatch = useDispatch();
const Loggedin = useSelector(initialState => initialState.auth.isAuthenticated);

const onlogoutClick = async e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';     
  };  

  return (
    <Provider store={store}>
      <Wrapper>

    <div className="Dash">
      { Loggedin ? ( <Link to="Dashboard" className="btn btn-light">
           Dashboard 
          </Link> ) : ( null ) }
    </div>  
    
    <div className="LogoutBtn"> 
      { Loggedin ? 
      ( <button type="button" class="btn btn-primary" onClick={(e) => onlogoutClick(e)}>
      Log Out
      </button>) : ( null )}
    </div>

    

       </Wrapper>
    </Provider>
     
  )};
      
  // Logout.propTypes = {
  //   logout: PropTypes.func.isRequired,
  //   isAuthenticated: PropTypes.bool
  // };
  
  // const mapStateToProps = (state) => ({
  //   isAuthenticated: state.auth.isAuthenticated,
  // });
  
  // export default connect(
  //   mapStateToProps,
  //   { logout }
  // )(Logout);
