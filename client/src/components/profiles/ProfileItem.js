import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
font-family: "Trebuchet MS", sans-serif;
width: 200px;

`;

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    gender,
    location,
    interests
  }
}) => {
  return (
    <Wrapper>
    <div className="profile">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {gender} 
        </p>
        <p className="fas fa-globe-asia"> &nbsp; {location && <span>{location}</span>}</p>
        
      </div>

      <div className="interests">
      <p> Personal Interests: </p>
        {interests.slice(0, 4).map((interest, index) => (
          <p key={index} className="text-success">
            <i className="fas fa-check" /> {interest}
          </p>
        ))}
      </div>
      <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
    </div>
   </Wrapper>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;