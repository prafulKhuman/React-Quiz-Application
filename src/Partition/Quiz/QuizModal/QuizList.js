import "./style.css"
import { useState } from "react";
import QuizRules from "./QuizRules";
function QuizList({quiz , show , setModalShow}) {
   
    return (<>
        
        <div>
            <QuizRules
                show={show}
                quiz={quiz}
                onHide={() => setModalShow(false)}
            />
        </div>
    </>);
}

export default QuizList;