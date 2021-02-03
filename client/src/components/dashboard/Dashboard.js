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
 letter-spacing: 5px;
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
          {/* <Experience experience={profile.experience} /> */}
            {/* <Education education={profile.education} /> */}

            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fas-user-minus"></i>Delete my Account
              </button>
            </div>

            <Link to="Shop" className="btn btn-light">
        <i className="far fa-handshake fa-2x" /> Go Shopping
            </Link>

            </Wrapper>
        </Fragment>
      ) : (
       <Fragment>
        <Wrapper>
          <p>You have not created a profile, please add some info</p>
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