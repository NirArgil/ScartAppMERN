import { Wrapper } from "./Header.styles";

import { Logout }  from "../components/auth/Logout";

import auth from "../../src/components/profile/Profile"

// import {isAuthenticated} from "../components/auth/Register";

import {logout} from "../actions/auth"

import { loadUser } from "../actions/auth";

// if (auth) { // if there is a value named as islogin...
//   <Button>Logout</Button>
// } else { 
//   <Button>Login</Button>
// }

const Header = () => {
 
    return (
     <Wrapper>

      <nav class="navbar sticky-top">
        <a class="navbar-brand" href="">Scart</a> 
         <Logout />
           
      </nav>
    </Wrapper> 
  )   
};

export default Header;