import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import LinearProgress from '@material-ui/core/LinearProgress';

import styled from 'styled-components';

export const Wrapper = styled.div`
font-family: "Trebuchet MS", sans-serif;
text-align: center;
margin-top: 25px;

h1 {
 letter-spacing: 7px;
 font-weight: 900;
 font-size: 50px;
}

.GoShop {
  padding: 10px;
  margin-top: 10px;
}

.DLT {
  margin-top: 90px;
  margin-bottom: -100px;
} 

p {
 font-weight: 100;
 font-size: 25px;
}
}
`;


const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <LinearProgress /> 
  ) : (
    
    <Fragment>
    <Wrapper>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>
    </Wrapper>
      {profile !== null ? (
        <Fragment>
        <Wrapper>
          <DashboardActions />
              
            <div className="GoShop"> 
              <Link to="/shop" className="btn btn-light">
              <i className="far fa-handshake fa-2x" /> Go Shopping
              </Link>
            </div>

            <div className="DLT">
              <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                  <i className="fas fas-user-minus"></i>Delete my Account
                </button>
              </div>
            </div>

            </Wrapper>
        </Fragment>
      ) : (
       <Fragment>
        <Wrapper>
          <p>You're profile is empty right now,<br />
           please create your profile and add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
          </Wrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);