import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";

import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileTop from "./ProfileTop";
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

const Wrapper = styled.div`
font-family: "Trebuchet MS", sans-serif;
text-align: center;
margin-top: 25px;
`;

const Profile = ({
  getProfileById,
  profile: {
    profile,
    loading
  },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

     <Wrapper>
       <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />   
       </div>
       </Wrapper>
   </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);