import { Wrapper } from "./Header.styles";
import { Provider } from "react-redux";
import { Logout }  from "../components/auth/Logout";
import store from "../store";
import React from "react";

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