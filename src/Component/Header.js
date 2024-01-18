/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import "./Coustom.css"
import Logo from "./Image/Main.png";
import { useAuth } from '../AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';
import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_USER_CONDITION } from "../ApolloClient/User/UserApollo";
import ResetPassword from "./Authentication/ResetPassword";


function Header() {
    const { dispatch } = useAuth();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [resetShow, setResetshow] = useState(false);


    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push("/Login")

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

                    <div className="d-none d-lg-block profile-icon">
                        <i className="navbar-icon bi-person smoothscroll " onClick={() => setShow(!show)}></i>
                    </div>
                    {
                        show && <div className="profile-card d-flex flex-column card">
                            <div className="word d-flex flex-wrap">
                                <strong className="mb-3" ><i class="bi bi-person icon-size"> </i> <span> Hi , {" "} {authorizeUser.data ? authorizeUser?.data?.User[0].username : "UnAuthorize"} </span></strong>
                                <strong className="pe-auto" onClick={() => setResetshow(!resetShow)}><i class="bi bi-recycle" style={{ paddingRight: "5px" }}></i> {"  "} Reset Password</strong>
                            </div>

                            <div class="card-footer d-flex justify-content-end">

                                <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav>


        <ResetPassword
            show={resetShow}
            onHide={() => setResetshow(false)}
        />

    </>);
}

export default Header;