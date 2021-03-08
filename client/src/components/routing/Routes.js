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
        <PrivateRoute exact path="/shop" component={Shop} />
       
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes