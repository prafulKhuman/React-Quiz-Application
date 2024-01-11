// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Component/Authentication/Login";
// import Register from "./Component/Authentication/Register";
// import Home from "./Pages/Home/Home";
// import { useAuth } from './AuthContext/AuthContext';
// import { useNavigate } from 'react-router-dom';

// function RoutesConfig() {
//     const { state } = useAuth();
//     const navigate = useNavigate();

//     const isAuthorized = () => {
//         return state?.isAuthenticated;
//     }
    
//     if(!isAuthorized){
//         navigate("/Login")
//     }

//     const handleSuccessfulLogin = () => {
//         if (isAuthorized()) {
//             navigate('/DashBoard');
//         }
//     }

//     return (
//         <Routes>
//             <Route
//                 path="/"
//                 element={<Login onSuccess={handleSuccessfulLogin} />}
//             />
//             <Route path="/Login" element={<Login onSuccess={handleSuccessfulLogin} />} />
//             <Route path="/Register" element={<Register />} />
           
//             {isAuthorized() ? 
//                 <Route path="/DashBoard" element={<Home />} />
//                 : <Route index element={<Navigate to="/Login" />} />
//             }
           
            
//         </Routes>
//     );
// }

// export default RoutesConfig;

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
