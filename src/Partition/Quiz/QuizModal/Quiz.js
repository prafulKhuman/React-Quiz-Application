import React, { useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";
import QuestionList from "./QuestionList";

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

function Quiz(props) {
   
    const [show, setShow] = useState(false)

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Starting Quiz .....
                    </Modal.Title>
                   
                </Modal.Header>

                
                   
                        <Modal.Body>
                            <div className="App">
                                <div className="timer-wrapper">
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={1}
                                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                        colorsTime={[10, 6, 3, 0]}
                                        onComplete={() => { setShow(true) ; props.onHide()}}
                                    >
                                        {({ remainingTime }) => <TimerComponent remainingTime={remainingTime} />}
                                    </CountdownCircleTimer>
                                </div>
                            </div>

                        </Modal.Body>
                        
                
            </Modal>
            { <QuestionList quiz={props?.quiz}   show={show} onHide={() => setShow(false)} />}
        </>
    );
}

export default Quiz;
