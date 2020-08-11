import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../src/modules/auth/Login/Login";
import RequestList from "./modules/Request/RequestList";
import CreateRequest from "./modules/Request/CreateRequest";
import CreateAssets from "../src/modules/Request/Components/CreateAssets";
import ForgotPassword from "./modules/auth/ForgotPassword/ForgotPassword";
import ForgotResetPassword from "../src/modules/auth/ForgotPassword/ForgotResetPassword";
import GetDetail from "../src/modules/Request/GetDetail";
import ChangePassword from "../src/modules/auth/ChangePassword/ChangePassword";
import Registration from "../src/modules/auth/Registration/Registration";
import AddRegistrationPassword from '../src/modules/auth/Registration/AddRegistrationPassword';
import EditRequest from '../src/modules/Request/EditRequest';
import Profile from '../src/modules/auth/Profile/Profile';

const Routes = () => {
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/manage-profile/:id">
          <Profile />
        </Route>

        <Route exact path="/registration">
          <Registration />
        </Route>

        <Route path="/registration/:token">
          <AddRegistrationPassword />
        </Route>

        <Route exact path="/request-list">
          <RequestList />
        </Route>

        <Route path="/request-list/create">
          <CreateRequest />
        </Route>

        <Route path="/request-list/:id/edit">
          <EditRequest />
        </Route>

        <Route path="/request-list/:id">
          <GetDetail />
        </Route>

        <Route exact path="/change-password">
          <ChangePassword />
        </Route>

        <Route path="/create/asset">
          <CreateAssets />
        </Route>

        <Route exact path="/forgotPassword">
          <ForgotPassword />
        </Route>

        <Route path="/forgotPassword/:token">
          <ForgotResetPassword />
        </Route>
      </Switch>
    </Router>

  );
};

export default Routes;
