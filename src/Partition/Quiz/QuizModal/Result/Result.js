/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import "../../style.css"
import Pass from "./Image/pass.png";
import Fail from "./Image/Fail.png";
import { useMutation } from '@apollo/client';
import { CREATE_RESULT } from "../../../../ApolloClient/ResultApollo/ResultApollo"
let condition = 1;


function Result(props) {
    const [correctoption, setCorrectoption] = useState(0);
    const [totalquestion, setTotalquestion] = useState(0);
    const [status, setStatus] = useState(false);
    const [addResult] = useMutation(CREATE_RESULT);

    useEffect(() => {
        const results = props?.selecteddata.filter(element => {
            return element !== null && element !== undefined;
        });

        console.log(results , "results");
        const newArray = _.uniqBy(results, 'question');
        const correctAns = newArray.filter((item) =>  item.ans === true );
        setCorrectoption(correctAns?.length);
        setTotalquestion(newArray?.length)
        setStatus(() => correctAns?.length >= (props?.questions?.length / 2) ? true : false);
        const userid = localStorage.getItem('USER_ID');

        if (props.show && condition === 1) {
            addResult({
                variables: {
                    quizname: props?.quiz?.name,
                    quizid: props?.quiz?.id,
                    userid: userid,
                    correctscore: correctoption.toString(),
                    incorrectscore: (correctoption - totalquestion).toString(),
                    missing : (props?.questions?.length - totalquestion).toString() ,
                    totalscore: (props?.questions?.length).toString(),
                    status: (correctAns.length >= (props?.questions?.length / 2) ? "PASS" : "FAIL")
                }
            }).then(() => { condition = condition + 1 }).catch((error) => console.log(error, "Result Error"))

        }


    }, [props?.selecteddata])

    // questions
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Result
                    </Modal.Title>
                    <div>
                        <div>
                            <strong className={`result-font fs-5 ${status ? "" : "fail"}`}> {status ? "Congretulation" : "Sorry"} </strong>
                            {status ? <img className='' alt='img' src={Pass} height={50} width={50} /> : <img className='' alt='img' src={Fail} height={50} width={50} />}
                        </div>
                        <div>
                            <strong className='result-font'> {status ? "Successfully Pass This Quiz" : " You Have Not Clear this Quiz"}</strong>
                        </div>


                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-around flex-wrap mt-5 '>
                        <div class="card  shadow-lg p-1 mb-5  bg-body rounded " style={{ width: "10rem" }}>
                            <div class="card-body text-center pt-4">
                                <h5 class="card-title ">Correct</h5>
                                <p class="card-text result-font fs-3"> {correctoption} </p>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <span>+</span>
                        </div>
                        <div class="card  shadow-lg p-1 mb-5  bg-body rounded " style={{ width: "10rem" }}>
                            <div class="card-body text-center pt-4">
                                <h5 class="card-title result-font">InCorrect</h5>
                                <p class="card-text result-font fs-3"> {correctoption - totalquestion} </p>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <span>+</span>
                        </div>
                        <div class="card  shadow-lg p-1 mb-5  bg-body rounded " style={{ width: "10rem" }}>
                            <div class="card-body text-center pt-4">
                                <h5 class="card-title result-font">Missing</h5>
                                <p class="card-text result-font fs-3"> { props?.questions ? props.questions.length - totalquestion : 0} </p>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <span>=</span>
                        </div>
                        <div class="card  shadow-lg p-1 mb-5  bg-body rounded " style={{ width: "10rem" }}>
                            <div className={`card-body text-center pt-4 `}>
                                <h5 className="card-title result-font">Total</h5>
                                <p className="card-text result-font fs-3">{props?.questions?.length}</p>
                            </div>

                        </div>
                    </div>
                    <div>
                        <ul>
                            <li className='result-font'>Minimun Contain 50% of Score to Pass This Quiz</li>
                            {status ?
                                <>
                                    <li className='result-font'>You have Obtain {correctoption} Score This is More Than 50% of {props?.questions?.length}</li>
                                    <li className='result-font'>So Congretulation You Have Successfully Pass this Quiz</li>
                                </>
                                :
                                <>
                                    <li className='result-font'>You have Obtain {correctoption} Score This is Not More Than 50% of {props?.questions?.length}</li>
                                    <li className='result-font'>So Sorry You Have't Pass this Quiz</li>
                                </>
                            }
                            <li className='result-font'>You have Successfully Complate this Quiz</li>
                        </ul>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Result;