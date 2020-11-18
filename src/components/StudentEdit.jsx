import React, {useState} from "react";
import * as axios from "axios";
import {Redirect} from "react-router-dom";



function editStudent(editedStudent) {
    const response = axios.post(`http://localhost:52751/api/school/` + editedStudent.id, editedStudent);
    console.log(editedStudent)
    console.log('👉 Returned data:', response);
}

const StudentEdit = (props) => {
    const [secondName, setSecondName] = useState(props.location.student.secondName ?? ''); // '' is the initial state value
    const [dateOfBirth, setDateOfBirth] = useState(props.location.student.dateOfBirth); // '' is the initial state value
    const [mathScore, setMathScore] = useState(props.location.student.mathScore ?? ''); // '' is the initial state value
    const [informScore, setInformScore] = useState(props.location.student.informScore ?? ''); // '' is the initial state value
    const [foreignLangScore, setForeignLangScore] = useState(props.location.student.foreignLangScore ?? ''); // '' is the initial state value
    const [edited,setEdited] = useState(false)
    let editedStudent = {
        id: props.location.student.id,
        secondName: secondName,
        dateOfBirth: dateOfBirth,
        mathScore: mathScore,
        informScore: informScore,
        foreignLangScore: foreignLangScore
    }

    if (edited){
        return (
            <Redirect to="/list" />
        )
    }else {
        return (
            <div>
                <div className="container mt-5 mb-5">
                    <h1>Редактирование ученика</h1>
                    <form method="post">
                        <div className="p-3">
                            <input type="text" onInput={e => setSecondName(e.target.value)}
                                   placeholder={secondName ?? 'Введите фамилию'}
                                   className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="date" onInput={e => setDateOfBirth(e.target.value)}
                                   value={dateOfBirth} className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="text" onInput={e => setMathScore(e.target.value)}
                                   placeholder={mathScore ?? 'Введите оценку по математике'}
                                   className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="text" onInput={e => setInformScore(e.target.value)}
                                   placeholder={informScore ?? 'Введите оценку по информатике'}
                                   className="form-control"/>
                        </div>
                        <div className="p-3">
                            <input type="text" onInput={e => setForeignLangScore(e.target.value)}
                                   placeholder={foreignLangScore ?? 'Введите оценку по иностранному языку'}
                                   className="form-control"/>
                        </div>
                        <button type="button" className="btn btn-primary p-3"
                                onClick={() => {
                                    editStudent(editedStudent)
                                    setEdited(true)
                                }}>Изменить
                        </button>
                    </form>
                </div>
            </div>
        );
    }

}

export default StudentEdit;