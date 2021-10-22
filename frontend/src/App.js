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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export default function App() {
  const token = getToken();
  // const [token, setToken] = useState();
  // if(!token){
  //     return <Login setToken={setToken} />
  // }
  return (
    <PageContainer>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/reviews/subject">
            <Subject />
          </Route>
          <Route path="/reviews/instructor">
            <Instructors />
          </Route>
          <Route path="/supplementaries">
            <Supplementary />
          </Route>
          <Route path="/settings">
            <Setting />
          </Route>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/forgot">
            <ForgotPassword />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    </PageContainer>
  );
}
