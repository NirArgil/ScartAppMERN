import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    gender,
    location,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top-css">
      <img className="rounded" src= "" alt="" />
      <h1 className="large">{name}</h1>
      
      <p><i className="fas fa-globe-asia fa-2x" /> {location && <span>{location}</span>}</p>

      <div className="icons my-1">
    
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
        )}
        &ensp;

        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        &ensp;

        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
        )}
        &ensp;

        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x " />
          </a>
        )}
        &ensp;

        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;