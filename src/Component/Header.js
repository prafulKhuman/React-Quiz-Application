/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import "./Coustom.css"
import Logo from "./Image/Main.png";
import { useAuth } from '../AuthContext/AuthContext';
import React  from "react";
import { useQuery } from '@apollo/client';
import {GET_USER_CONDITION} from "../ApolloClient/User/UserApollo";


function Header() {
    const { dispatch } = useAuth();
  
    const handleLogout =()=>{
       dispatch({ type: 'LOGOUT' })
    }

    const authorizeUser = useQuery(GET_USER_CONDITION, {
        variables: { id: localStorage.getItem("USER_ID") }
    });

    

    return (<>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand">
                    {/* <i className="bi-back"></i> */}
                    <img src={Logo} alt="" width="60px" height="55px" />

                </a>

                <div className="d-lg-none ms-auto me-4">
                    <a href="#top" className="navbar-icon bi-person smoothscroll"></a>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-lg-5 me-lg-auto">
                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_1">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_2">Browse Quiz</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section_3">How it works</a>
                        </li>



                    </ul>

                    
                    <div className="user">
                        <strong >Hi , {" "}</strong>
                        <strong className="pi-1 pe-auto" data-toggle="modal" data-target="#exampleModal" >  {authorizeUser.data ?   authorizeUser?.data?.User[0].username : "UnAuthorize"}</strong>
                        <img className="ml pe-auto" onClick={handleLogout} width="25" height="25" src="https://img.icons8.com/ios/50/logout-rounded--v1.png" alt="logout-rounded--v1"/>
                    </div>
                </div>
            </div>
        </nav>


       

    </>);
}

export default Header;