import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as axios from "axios";

let data = [ {
    "id": 4002,
    "secondName": "Antonov",
    "dateOfBirth": "01.02.1997",
    "mathScore": 4,
    "informScore": 3,
    "foreignLangScore": 3
}]

class StudentList extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            search_student_text: "",
            search_student_age: null,
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:52751/api/school`).then(response => {
            this.setState({items: response.data});
        });
    }

    deleteStudent(id) {
        axios.delete(`http://localhost:52751/api/school/` + id);
        axios.get(`http://localhost:52751/api/school`).then(response => {
            this.setState({items: response.data});
        });
    }

    orderBySecName(){
        axios.get(`http://localhost:52751/api/school/orderby`).then(response => {
            this.setState({items: response.data});
            console.log(response.data)
        });
    }

    calculate(){
        axios.get(`http://localhost:52751/api/school/calculate`).then(response => {
            alert("Среднее арифметическое всех учеников по трем предметам = " + response.data)
        });
    }

    search(secName){
        axios.get(`http://localhost:52751/api/school/search/`+secName).then(response => {
            this.setState({items: response.data});
            console.log(response.data)
        });
    }

    sample(age){
        axios.get(`http://localhost:52751/api/school/sample/`+age).then(response => {
            this.setState({items: response.data});
            alert("Выведены ученики старше " + age)
        });
    }

    render() {
        return (
            <div>
                <div className="container mt-5 mb-5">
                    <h1>Список учеников</h1>
                    <div className="row">
                        <Link to={{
                            pathname: "/add",
                        }}>
                            <button type="button" className="btn btn-primary">Добавить ученика</button>
                        </Link>
                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.orderBySecName()}>Упорядочить по фамилии
                        </button>
                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.calculate()}>Расчет среднего арифметического по трем предметам
                        </button>
                    </div>

                    <div className="row mt-3 mb-3">
                        <input type="text" placeholder="Фамилия ученика для поиска"
                               onInput={e => this.setState({ search_student_text: e.target.value})}/>

                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.search(this.state.search_student_text)}>Найти учеников
                        </button>
                    </div>

                    <div className="row mt-3 mb-3">
                        <input type="number" placeholder="Возраст" min="1" max="80000000"
                               onInput={e => this.setState({ search_student_age: e.target.value})}/>

                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.sample(this.state.search_student_age)}>Прозвести выборку
                        </button>
                    </div>

                    <table className="table">
                        <tbody>
                        <tr>
                            <th dataField='secondName'>Id</th>
                            <th dataField='secondName'>Фамилия</th>
                            <th dataField='secondName'>Дата рождения</th>
                            <th dataField='secondName'>Оценка по математике</th>
                            <th dataField='secondName'>Оценка по информатике</th>
                            <th dataField='secondName'>Оценка по иностранному языку</th>
                        </tr>
                        {

                            this.state.items.map((student, index) => {
                                const {id, secondName, dateOfBirth, mathScore, informScore, foreignLangScore} = student //destructuring
                                return (
                                    <tr>
                                        <td>{id}</td>
                                        <td>{secondName}</td>
                                        <td>{dateOfBirth}</td>
                                        <td>{mathScore}</td>
                                        <td>{informScore}</td>
                                        <td>{foreignLangScore}</td>
                                        <td>
                                            <Link to={{
                                                pathname: "/edit",
                                                student: student
                                            }}>
                                                <button type="button" className="btn btn-primary">Изменить</button>
                                            </Link>
                                        </td>
                                        <td>
                                            {/*<Link to={{
                                                pathname: "/edit",
                                                student: student
                                            }}>*/}
                                            {/*</Link>*/}
                                            <button type="button" className="btn btn-danger"
                                                    onClick={() => this.deleteStudent(id)}>Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default StudentList;