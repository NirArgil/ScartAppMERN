import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import styled from 'styled-components';

export const Wrapper = styled.div`

.landing {
  background-attachment: fixed;
  background-position: top;
  background-image:url(./img/C.jpg);
  background-size: contain;
  margin-top: 77px;
  text-align: center;
}

h1 {
 font-family: "Trebuchet MS", sans-serif;
 letter-spacing: 1px;
 font-size: 63px;
 text-align: center;
}

p {
 font-family: "Trebuchet MS", sans-serif;
 font-size: 30px;
 text-align: center;
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
        <div className="landing-inner">
          <h1 className="x-large">This is Scart</h1>
          <p className="lead">
            New Online Shopping Platform.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
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