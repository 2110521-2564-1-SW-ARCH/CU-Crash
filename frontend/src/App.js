import PageContainer from "./components/common/PageContainer";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Subject from "./pages/review/subject/Subject";
import Instructors from "./pages/review/instructor/Instructor";
import Supplementary from "./pages/supplementary/Supplementary";
import Setting from "./pages/setting/Setting";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function setProfile(user){
  sessionStorage.setItem("user-info", JSON.stringify(user));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function PrivateRoute(prop) {
  return getToken() != null
    ? <Route path={prop.path}>
        {prop.children}
      </Route>
    : <Redirect to="/login" push />
}

export default function App() {

  return (
    <PageContainer>
      <Router>
        <Switch>

          {/* private route */}
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/reviews/subject">
            <Subject />
          </PrivateRoute>
          <PrivateRoute path="/reviews/instructor">
            <Instructors />
          </PrivateRoute>
          <PrivateRoute path="/supplementaries">
            <Supplementary />
          </PrivateRoute>
          <PrivateRoute path="/settings">
            <Setting />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          {/* public route */}
          <Route path="/register">
            <Register />
          </Route>
          <Route path={["/login", "/"]}>
            <Login setToken={setToken} setProfile={setProfile}/>
          </Route>

        </Switch>
      </Router>
    </PageContainer>
  );
}
