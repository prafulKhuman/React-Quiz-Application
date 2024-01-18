/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../../ApolloClient/Category/CategoryQuery';
import List from "../Quiz/QuizModal";
import { BallTriangle } from 'react-loader-spinner';
import "./DashBoard.css";
import "./../Quiz/style.css";
import React, { useState } from 'react';
import { GET_QUIZ_CONDITION } from "../../ApolloClient/Quiz/QuizApollo"

function QuizList() {
    const [selectedCategory, setSelectedCategory] = useState("")
    const { data, error, loading } = useQuery(GET_CATEGORY);
    const [modalShow, setModalShow] = useState(false);
    const [selectedQuiz , setSelectedQuiz] = useState(null);
    const [ quizdata , setQuizdata ] = useState(false);


    const Quiz = useQuery(GET_QUIZ_CONDITION, {
        variables: { category: selectedCategory },
    });

    const QuizAll = useQuery(GET_QUIZ_CONDITION);

    const handleClick =(record)=>{
        setModalShow(true);
        setSelectedQuiz(record)
    }

    return (<>

        <section className="explore-section section-padding" id="section_2">
            <div className="container">
                <div className="row">

                    <div className="col-12 text-center">
                        <h2 className="mb-4">Find Quiz</h2>
                    </div>



                </div>
            </div>


            {loading ?
                <div className='spiner-container'>
                    <BallTriangle
                        height={150}
                        width={150}
                        radius={5}
                        color="#80d0c7"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
                : <>

                    <div className="container-fluid">

                        <div className="row">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation" >
                                    <button className="nav-link active" id="design-tab" type="button" role="tab" aria-controls="design-tab-pane" onClick={()=> setQuizdata(!quizdata)}>All</button>
                                </li>
                                {data?.Category.map((cat) => (

                                    <li className="nav-item" role="presentation" key={cat.id}>
                                        <button className={`nav-link ${selectedCategory === cat.id ? 'coustom' : ''}`} id="design-tab" onClick={() => { setSelectedCategory(cat.id) ; setQuizdata(false) }} type="button" role="tab" aria-controls="design-tab-pane" >{cat.name}</button>
                                    </li>

                                ))}


                            </ul>
                        </div>
                    </div>




                    <div className="container">

                        <div className="row">

                            <div className="col-12">
                                <div className="tab-content" id="myTabContent">
                                    <div className='panel-view'>
                                        <div className="tab-pane fade show active" id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab" tabIndex="0">
                                            <div className="row">
                                                {Quiz?.loading ?
                                                    <div className='spiner-container'>
                                                        <BallTriangle
                                                            height={150}
                                                            width={150}
                                                            radius={5}
                                                            color="#80d0c7"
                                                            ariaLabel="ball-triangle-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                        />
                                                    </div>
                                                    :
                                                    (quizdata ? QuizAll?.data?.Quiz :  Quiz?.data?.Quiz)?.map((record , index) => (
                                                  
                                                        <div key={index} className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" >
                                                            <div className="custom-block bg-white shadow-lg">

                                                                <div className="d-flex">
                                                                    <div>
                                                                        <h5 className="mb-2">{record.name}</h5>

                                                                        <p className="mb-0">{record.description}</p>

                                                                        <div className="mt-5">
                                                                            <h6>Start the Quiz</h6>
                                                                            <p>Good luck!</p>
                                                                        </div>
                                                                        <div>
                                                                        <div className="start_btn"><button onClick={() => handleClick(record) } >Start Quiz</button></div>
                                                                            <List Quiz={selectedQuiz} show={modalShow} ModalShow={(modalshow)=>{setModalShow(modalshow)}}/>
                                                                        </div>

                                                                    </div>



                                                                    <span className="badge bg-design rounded-pill ms-auto">{record.totalQuestion}</span>
                                                                </div>


                                                            </div>
                                                        </div>

                                                    ))
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </section>
    </>);
}

export default QuizList;