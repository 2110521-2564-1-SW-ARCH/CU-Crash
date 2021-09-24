import PageContainer from './components/common/PageContainer';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <PageContainer>
                        <Login />
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
