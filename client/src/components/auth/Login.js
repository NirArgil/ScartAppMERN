import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import React, { Fragment, useState } from "react";

import { login } from "../../actions/auth";

import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: "Trebuchet MS", sans-serif;
  text-align: center;
  margin-top: 25px;
  height: 480px;
`;


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    
  };

  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  };

  return (
    <Fragment>
    <Wrapper>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Your Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <br/>
      <p className="my-1">
        Don't have any account? <Link to="/register">Sign Up</Link>
      </p>
      </Wrapper>
    </Fragment>
  )};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// const mapStateToProps = (state) => ({
//   isAuth: state.auth.isAuth,
//   loading: state.auth.loading,
// });

export default connect(
  mapStateToProps,
  { login }
)(Login);