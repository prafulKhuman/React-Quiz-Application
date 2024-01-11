import QuizList from "./QuizList";
import "./style.css"
function index({Quiz , show , ModalShow}) {
   
    return (<>
       <QuizList quiz={Quiz} show={show} setModalShow={ModalShow}/>

    </>);
}

export default index;