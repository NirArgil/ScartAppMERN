import { Wrapper } from "./Header.styles";
import { connect, Provider } from "react-redux";
import { Logout }  from "../components/auth/Logout";
import auth from "../../src/components/profile/Profile"
import {logout} from "../actions/auth"
import store from "../store";
import * as getCurrentProfile from "../../src/actions/profile";
import React, { useEffect, Fragment } from "react";
import { loadUser } from "../actions/auth";
import userEvent from "@testing-library/user-event";
import { Link, Router } from "react-router-dom";



const Header =  () => {
  
    return (
    <Provider store={store}>
     <Wrapper>
     
      <nav class="navbar sticky-top">
        <a class="navbar-brand" href="">Scart</a>
       
         <Logout />
           
      </nav>
      
     </Wrapper> 
    </Provider>
  )   
  
};

export default Header;