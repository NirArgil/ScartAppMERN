import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import "./Landing.css";
import styled from 'styled-components';

export const Wrapper = styled.div`

.landing {
  text-align: center;
  height: 720px;
}

h1 {
 font-family: "Trebuchet MS", sans-serif;
 letter-spacing: 1px;
 font-size: 54px;
 text-align: center;
 color: white;
}
#scart {
  font-size: 75px;
}

p {
 font-family: "Trebuchet MS", sans-serif;
 font-size: 30px;
 text-align: center;
 color: white;
}
#register {
  display: inline-block;
  margin-right: 9px;
}

#login{
  display: inline-block;
}
.buttons {
 font-family: "Trebuchet MS", sans-serif;
 text-align: center;
 
}
`;

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>

      <section className="landing">
        <br/><br/><br/>
          <h1 className="x-large">This is <span id="scart">Scart</span></h1>
          <p className="lead">
            New Online Shopping Platform.
          </p>
          <div className="buttons">
            <Link to="/register" id="register" className="btn btn-primary">
              Register
            </Link>
            <Link to="/login" id="login" className="btn btn-light">
              Login
            </Link>

          </div>
        
      </section>
    </Wrapper>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);