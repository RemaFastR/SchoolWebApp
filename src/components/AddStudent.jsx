import React, {useState} from "react";
import * as axios from "axios";
import {Redirect} from "react-router-dom";



function addStudent(editedStudent) {
    axios.post("http://localhost:52751/api/school", editedStudent);
    console.log(editedStudent)
}

const AddStudent = (props) => {
    const [secondName, setSecondName] = useState( ''); // '' is the initial state value
    const [dateOfBirth, setDateOfBirth] = useState(''); // '' is the initial state value
    const [mathScore, setMathScore] = useState( ''); // '' is the initial state value
    const [informScore, setInformScore] = useState( ''); // '' is the initial state value
    const [foreignLangScore, setForeignLangScore] = useState( ''); // '' is the initial state value
    const [added, setAdded] = useState( false); // '' is the initial state value
    let editedStudent = {
        secondName: secondName,
        dateOfBirth: dateOfBirth,
        mathScore: parseInt(mathScore),
        informScore: parseInt(informScore),
        foreignLangScore: parseInt(foreignLangScore)
    }

    if (added){
        return (
            <Redirect to="/list" />
            )
    } else {
        return (
            <div>
                <div className="container mt-5 mb-5">
                    <h1>Редактирование ученика</h1>
                    <form method="post">
                        <div className="p-3">
                            <input type="text" onInput={e => setSecondName(e.target.value)}
                                   placeholder={'Введите фамилию'}
                                   className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="date" onInput={e => setDateOfBirth(e.target.value)}
                                   value={dateOfBirth} className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="text" onInput={e => setMathScore(e.target.value)}
                                   placeholder={'Введите оценку по математике'}
                                   className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="text" onInput={e => setInformScore(e.target.value)}
                                   placeholder={'Введите оценку по информатике'}
                                   className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="text" onInput={e => setForeignLangScore(e.target.value)}
                                   placeholder={'Введите оценку по иностранному языку'}
                                   className="form-control"/>
                        </div>
                        <button type="button" className="btn btn-primary p-3"
                                onClick=
                                    {
                                        () => {
                                            addStudent(editedStudent)
                                            setAdded(true)
                                        }

                                    }>Добавить
                        </button>
                    </form>
                </div>
            </div>
        );
    }


}

export default AddStudent;