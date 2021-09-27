import PageContainer from './components/common/PageContainer';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Review from './pages/review/Review';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from 'react';

// function setToken(userToken) {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
//   }
  
// function getToken() {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
//   }

export default function App() {
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
                        <Review />
                    </PageContainer>
                </Route>
                <Route path="/login">
                    <PageContainer>
                        <Login />
                    </PageContainer>
                </Route>
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
                        <Login />
                    </PageContainer>
                </Route>

            </Switch>
        </Router>
    );
}
