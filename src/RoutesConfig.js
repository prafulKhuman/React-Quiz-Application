

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Component/Authentication/Login";
import Register from "./Component/Authentication/Register";
import { useAuth } from './AuthContext/AuthContext';
import Home from "./Pages/Home/Home";
import { useHistory } from 'react-router-dom';

export default function RoutesConfig() {
    const { state } = useAuth();
    const history = useHistory();

    const isAuthorized = () => {
        return state?.isAuthenticated;
    }

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthorized() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/Login" />
                    )
                }
            />
        );
    }

    const handleSuccessfulLogin = () => {
        if (isAuthorized) {
            history.push('/dashboard');
        }
    }

    return (
        <Switch>
            <Route
                path="/Login"
                render={(props) => <Login {...props} onSuccess={handleSuccessfulLogin} />}
            />
            <Route path="/Register" component={Register} />

            <PrivateRoute
                path="/dashboard"
                component={Home}
            />

            <Route render={() => <Redirect to="/Login" />} />
        </Switch>
    );
}
