/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import Spodomeetar from "../../Component/Spodomeetar";
import { useQuery } from '@apollo/client';
import { GET_RESULT_CONDITION } from "../../ApolloClient/ResultApollo/ResultApollo";
import React, { useState, useEffect } from "react";
import "./DashBoard.css"

function ScoreCard() {
    const userid = localStorage.getItem("USER_ID");
    const [data, setData] = useState({});
    const [alldata, setAllData] = useState({});
    const [loading, setloading] = useState(false);
    const [loadingnew, setloadingnew] = useState(false);
    const [passQuiz, setPassQuiz] = useState(false);
    const [totalScore, setTotalScore] = useState(false);



    const LastQuiz = useQuery(GET_RESULT_CONDITION, {
        variables: { id: "", userId: userid.toString() },
    });

    const allQuiz = useQuery(GET_RESULT_CONDITION, {
        variables: { id: userid.toString(), userId: " " },
    });


    useEffect(() => {
        if (LastQuiz) {
            setloading(LastQuiz.loading);
            setData(LastQuiz?.data?.Result[0]);
        }
    }, [LastQuiz]);

    useEffect(() => {
        if (allQuiz) {
            setloadingnew(allQuiz.loading);
            setAllData(allQuiz?.data?.Result);
            setPassQuiz(allQuiz?.data?.Result?.filter((item) => item.status === "PASS"));
            setTotalScore(allQuiz?.data?.Result?.reduce((accumulator, item) => {
                return accumulator + ( parseInt(item.correctscore) || 0);
            }, 0));
        }
    }, [allQuiz]);


    return (<>
        <section className="featured-section">
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                        <div className="custom-block bg-white shadow-lg">

                            <div className="d-flex">
                                <div>
                                    <h5 className="mb-2">Last Quiz Score</h5>
                                    <div>
                                        <Spodomeetar score={data?.correctscore} />
                                    </div>
                                    <div className="mt-3">
                                        <p>Quiz Name :: <span> {loading ? "Wait...." : data ? data.quizname : ""}</span></p>
                                        <p>Total Score :: <span>{loading ? "Wait...." : data ? data.totalscore : ""}</span></p>
                                        <p>Obtain Score :: <span>{loading ? "Wait...." : data ? data.correctscore : ""}</span></p>
                                        <p> Status :: <span>{loading ? "Wait...." : data ? data.status : ""}</span></p>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>

                    <div className="col-lg-6 col-12">
                        <div className="custom-block custom-block-overlay">
                            <div className="d-flex flex-column h-100">
                                <img src="/public/assest/images/businesswoman-using-tablet-analysis.jpg" className="custom-block-image img-fluid" alt="" />


                                <div className="custom-block-overlay-text d-flex">
                                    <div className="w-100 ">
                                        <h5 className="text-white mb-2">Quiz Summary</h5>
                                        <div className="d-lg-flex flex-wrap container card-height-m">
                                            <div className="d-flex flex-wrap justify-content-around mt-5  w-100 ">
                                                <div className="card w-80 bg-transparent mt-4 border-0">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-center ">{loadingnew ?
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div> :
                                                            alldata?.length || 0}</h5>
                                                        <p className="card-text text-center font-color-contain" >Total Quiz </p>

                                                    </div>
                                                </div>
                                                <div className="card w-80 bg-transparent mt-4 border-0">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-center">{loadingnew ?
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div> :
                                                            passQuiz?.length || 0}</h5>
                                                        <p className="card-text text-center font-color-contain">Passed Quiz</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-wrap justify-content-around mt-7 w-100">
                                                <div className="card w-80 bg-transparent mt-4 border-0">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-center">{loadingnew ?
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div> :
                                                            alldata?.length - passQuiz?.length || 0}</h5>
                                                        <p className="card-text text-center font-color-contain">Fail Quiz</p>

                                                    </div>
                                                </div>
                                                <div className="card w-80 bg-transparent mt-4 border-0">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-center">{loadingnew ?
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div> :
                                                            totalScore || 0}</h5>
                                                        <p className="card-text text-center font-color-contain">Total Score </p>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>



                                    </div>

                                    <span className="badge bg-finance rounded-pill ms-auto"><i className="bi bi-activity"></i></span>
                                </div>

                                <div className="social-share d-flex">
                                    <p className="text-white me-4">Share:</p>

                                    <ul className="social-icon">
                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link  bi bi-instagram"></a>
                                        </li>

                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi-facebook"></a>
                                        </li>

                                        <li className="social-icon-item">
                                            <a href="#" className="social-icon-link bi bi-whatsapp"></a>
                                        </li>
                                    </ul>

                                    <a href="#" className="custom-icon bi-bookmark ms-auto"></a>
                                </div>

                                <div className="section-overlay"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>);
}

export default ScoreCard;