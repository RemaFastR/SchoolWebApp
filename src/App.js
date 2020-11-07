import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter} from "react-router-dom";
import * as axios from "axios";
import StudentEdit from "./components/StudentEdit";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";


function App() {

        return (
            <BrowserRouter>
                <div className="App">
                    <Route path='/edit' render={
                        (props)=><StudentEdit {...props} student={props}/>
                    }/>
                    <Route path='/list' render={
                        ()=><StudentList />
                    }/>
                    <Route path='/add' render={
                        ()=><AddStudent />
                    }/>
                </div>

            </BrowserRouter>
        );

}

export default App;
