import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from "../layout/NotFound";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard.js";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import Shop from "../../Shop";
// import AddExperience from "../profile-forms/AddExperience";
// import AddEducation from "../profile-forms/AddEducation";
// import Post from "../post/Post";
// import Posts from "../posts/Posts";
import Profile from "../profile/Profile";
import Profiles from "../profiles/Profiles";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/:id" component={Profile} />

        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/Shop" component={Shop} />
        {/* <PrivateRoute exact path="/" component={Logout} /> */}

        
        {/* <PrivateRoute */}
          {/* exact */}
          {/* path="/add-experience" */}
          {/* component={AddExperience} */}
        {/* /> */}
        {/* <PrivateRoute exact path="/add-education" component={AddEducation} /> */}
        {/* <PrivateRoute exact path="/post/:id" component={Post} /> */}
        {/* <PrivateRoute exact path="/posts" component={Posts} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes