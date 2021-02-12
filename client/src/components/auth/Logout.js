import { Provider } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import store from "../../store";
import styled from 'styled-components';

export const Wrapper = styled.div`

.CustomersBtn {
  display: inline-block;
  margin-right: 16px;
}

.DashBtn { 
  display: inline-block
  margin-right: 3px;
}

.LogoutBtn {
 display: inline-block
}`;

export const Logout = ( ) => {  

const Loggedin = useSelector(initialState => initialState.auth.isAuthenticated);

const onlogoutClick = async e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';     
  };  

  return (
    <Provider store={store}>
      <Wrapper>

    <div className="CustomersBtn">
      { Loggedin ? ( <Link to="/profiles" className="btn btn-light">
           Scart Customers 
          </Link> ) : ( null ) }
    </div>  

    <div className="DashBtn">
      { Loggedin ? ( <Link to="/dashboard" className="btn btn-light">
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
