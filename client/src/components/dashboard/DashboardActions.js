import { Link } from "react-router-dom";
import React from 'react'

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
    
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
    </div>
  );
}

export default DashboardActions