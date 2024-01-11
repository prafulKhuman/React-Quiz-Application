/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/aria-props */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useQuery } from '@apollo/client';
import { GET_QUESTION_ID } from "../../../ApolloClient/Question/QuestionApollo";
import Result from './Result/Result';
import React, { useState, useRef, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";


const TimerComponent = ({ remainingTime }) => {
    const [, setOneLastRerender] = useState(0);
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender((val) => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <div className="time-wrapper">
            <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                {remainingTime}
            </div>
            {prevTime.current !== null && (
                <div
                    key={prevTime.current}
                    className={`time ${!isTimeUp ? "down" : ""}`}
                >
                    {prevTime.current}
                </div>
            )}
        </div>
    );
};

function QuestionList(props) {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [ selectedOption , setSelectedOption] = useState({}); 
    const [ selectedResult , setSelectedResult] = useState([]); 
    const [modalShow , setModalShow] = useState(false);
    const [key, setKey] = useState(0);
    const [questiones, setQuestion] = useState([]);
    const [coustomClass, setCoustomClass] = useState({})


    const questions = useQuery(GET_QUESTION_ID, {
        variables: { id: props?.quiz?.id }
    });

    
    useEffect(() => {
        setQuestion(questions?.data?.Question[0]?.questions);
    }, [questions?.data?.Question])

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questiones?.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }

    };

   
    const handleselect = (option , question  , selctedOption) => {
        // option , questiones[currentQuestionIndex]?.question , 'Option' + String.fromCharCode(65 + index)
        setCoustomClass({[selctedOption] : "option-item "})
        setSelectedOption({
            question : question ,
            ans : option.status ,
            ansvalue : option.value ,
            config : 1 
        })
    }

    // console.log(currentQuestionIndex < questiones?.length - 1 , "selectedResult");
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelleDy="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Quiz - {props?.quiz?.name}
                    </Modal.Title>

                    <><div className="q-total">
                        <p>
                            <span className="q-digit">Left  {questiones?.length - (currentQuestionIndex + 1)}</span> Out Of{" "}
                            <span className="q-digit">  {props?.quiz?.totalQuestion} Question</span>
                        </p>
                    </div><div>
                            <div class="timer">
                                <span className="time-left"> TIME LEFT </span>
                                <CountdownCircleTimer
                                    key={key}
                                    isPlaying
                                    duration={10}
                                    size={0}
                                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                    colorsTime={[10, 6, 3, 0]}
                                    onComplete={() => {
                                        setSelectedResult(prev => [...prev, selectedOption]);
                                        handleNextQuestion();
                                        setSelectedOption(null)
                                        if (currentQuestionIndex < questiones?.length - 1) {
                                            setModalShow(false);
                                            return { shouldRepeat: true }
                                        }else{
                                           if(!modalShow){
                                                setModalShow(true);
                                                props.onHide();
                                                setCurrentQuestionIndex(0)
                                           }
                                        }
                                    }}
                                >
                                    {({ remainingTime }) => <TimerComponent remainingTime={remainingTime} />}
                                </CountdownCircleTimer>
                            </div>
                        </div></>

                </Modal.Header>


                <>
                    <Modal.Body>
                        <div className='question-container'>
                            <strong className='question'>{currentQuestionIndex + 1} . {questiones ? questiones[currentQuestionIndex]?.question : "Not Found"}</strong>
                            <div className='option'>
                                <ol type="A">
                                    {questiones && questiones[currentQuestionIndex]?.options.map((option, index) => (
                                        <li
                                            key={index}
                                            className={`pe-auto ${coustomClass?.['Option' + String.fromCharCode(65 + index)]}`}
                                            onClick={() => handleselect(option , questiones[currentQuestionIndex]?.question , 'Option' + String.fromCharCode(65 + index))}
                                        >
                                            {option.value}
                                        </li>
                                    ))}
                                </ol> 
                            </div>
                        </div>
                    </Modal.Body>

                </>

                <Modal.Footer>
                    <Button variant='outline-primary' onClick={() => { 
                        setSelectedResult(prev => [...prev, selectedOption]);
                        setSelectedOption(null)
                        handleNextQuestion(); 
                        setKey(prevKey => prevKey + 1) ;   
                        if (currentQuestionIndex === questiones?.length - 1) {
                            setModalShow(true);
                            props.onHide();
                            setCurrentQuestionIndex(0)
                        } else {
                            setModalShow(false);
                        }
                    }}>
                        {currentQuestionIndex === questiones?.length - 1 ? "Submit Quiz" :   "Next Question."}
                       
                    </Button>
                </Modal.Footer>
            </Modal>
            <Result
                quiz = {props?.quiz}
                selecteddata = {selectedResult}
                show={modalShow}
                onHide={() => setModalShow(false)}
                questions = {questiones}
            />
        </>
    );


}

export default QuestionList;