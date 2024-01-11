import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Quiz from './Quiz';
import { useQuery } from '@apollo/client';
import { GET_RULES_CONDITION } from '../../../ApolloClient/Rules/RulesApollo';
import DataNotFound from '../../Error/DataNotFound';


function QuizRules(props) {
  const [ showQuiz , setShowQuiz ] = useState(false);


  const Quizdata = useQuery(GET_RULES_CONDITION, {
    variables: { quizid: (props?.quiz?.id)?.toString() },
  });



  return (
    <><Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
         Terms And Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Quizdata?.data?.Rules?.length > 0 ? 
        <ol>
          {Quizdata?.data?.Rules[0]?.rules?.split('\n').map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
        :
            <DataNotFound/>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.onHide}>Exit Quiz</Button>
        {Quizdata?.data?.Rules?.length > 0 ? <Button onClick={()=>{  setShowQuiz(true) ; props.onHide() }}>Start</Button> : ""}
      </Modal.Footer>
    </Modal>
      <div>
      {Quizdata?.data?.Rules?.length > 0 ? 
        <Quiz
          quiz = {props?.quiz}
          show={showQuiz}
          onHide={() => setShowQuiz(false)} 
        />
        
      : ""}
      </div>
    </>
  );
}

export default QuizRules ;