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
    <Router>
      <Switch>
        <Route path="/register">
          <PageContainer>
            <Register />
          </PageContainer>
        </Route>
        <Route path="/home">
          <PageContainer>
            <Home />
          </PageContainer>
        </Route>
        <Route path="/reviews/subject">
          <PageContainer>
            <Subject />
          </PageContainer>
        </Route>
        <Route path="/reviews/instructor">
          <PageContainer>
            <Instructors />
          </PageContainer>
        </Route>
        <Route path="/supplementaries">
          <PageContainer>
            <Supplementary />
          </PageContainer>
        </Route>
        <Route path="/settings">
          <PageContainer>
            <Setting />
          </PageContainer>
        </Route>
        <Route path="/login">
          <PageContainer>
            <Login setToken={setToken} />
          </PageContainer>
        </Route>
        {/* <Route path="/login">
                    <PageContainer>
                        <Login />
                    </PageContainer>
                </Route> */}
        <Route path="/forgot">
          <PageContainer>
            <ForgotPassword />
          </PageContainer>
        </Route>
        <Route path="/dashboard">
          <PageContainer>
            <Dashboard />
          </PageContainer>
        </Route>

        <Route path="/">
          <PageContainer>
            <Login setToken={setToken} />
          </PageContainer>
        </Route>
      </Switch>
    </Router>
  );
}
