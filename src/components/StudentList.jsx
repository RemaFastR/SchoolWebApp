import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as axios from "axios";


class StudentList extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            search_student_text: "",
            search_student_age: null,
            search_input: 'Найти учеников',
            sample_input: 'Произвести выборку',
            order_bnt: 'Упорядочить по фамилии'
        };
    }

    tempList = []
    searched = false
    isSample = false
    isOrdered = false

    componentDidMount() {
        axios.get(`http://localhost:52751/api/school`).then(response => {
            this.setState({items: response.data});
            this.tempList = response.data;
        });
    }

    componentDidUpdate() {
        axios.get(`http://localhost:52751/api/school`).then(response => {
            this.setState({items: response.data});
            this.tempList = response.data;
        });
    }

    deleteStudent(id) {
        axios.delete(`http://localhost:52751/api/school/` + id);
        axios.get(`http://localhost:52751/api/school`).then(response => {
            this.setState({items: response.data});
        });
    }

    orderBySecName(){
        if (this.isOrdered === false){
            axios.get(`http://localhost:52751/api/school/orderby`).then(response => {
                this.setState({items: response.data,order_bnt: 'Отменить'});
                console.log(response.data)
            });
            this.isOrdered = true
        }
        else{
            this.setState({items: this.tempList, order_bnt: 'Упорядочить по фамилии'})
            this.isOrdered = false
        }
    }

    calculate(){
        axios.get(`http://localhost:52751/api/school/calculate`).then(response => {
            alert("Среднее арифметическое всех учеников по трем предметам = " + response.data)
        });
    }

    search(secName){
        if (this.searched === false){
            axios.get(`http://localhost:52751/api/school/search/`+secName).then(response => {
                this.setState({items: response.data, search_input: 'Исходный список' });
                console.log(response.data)
            });
            this.searched = true
        }
        else {
            this.setState({items: this.tempList, search_input: 'Найти учеников'})
            this.searched = false
        }
    }

    sample(age){
        if (this.isSample === false){
            axios.get(`http://localhost:52751/api/school/sample/`+age).then(response => {
                this.setState({items: response.data, sample_input: 'Исходный список'});
                alert("Выведены ученики старше " + age)
            });
            this.isSample= true
        }
       else {
            this.setState({items: this.tempList, sample_input: 'Произвести выборку'})
            this.isSample= false
        }
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
                                onClick={() => this.orderBySecName()}>{this.state.order_bnt}
                        </button>
                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.calculate()}>Расчет среднего арифметического по трем предметам
                        </button>
                    </div>

                    <div className="row mt-3 mb-3">
                        <input type="text" placeholder="Фамилия ученика для поиска"
                               onInput={e => this.setState({ search_student_text: e.target.value})}/>

                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.search(this.state.search_student_text)}>{this.state.search_input}
                        </button>
                    </div>

                    <div className="row mt-3 mb-3">
                        <input type="number" placeholder="Возраст" min="1" max="80000000"
                               onInput={e => this.setState({ search_student_age: e.target.value})}/>

                        <button type="button" className="btn btn-primary ml-2"
                                onClick={() => this.sample(this.state.search_student_age)}>{this.state.sample_input}
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