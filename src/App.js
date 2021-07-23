
import './App.css';
import {Switch,Route, useParams, useHistory} from "react-router-dom"
import NavTabs from './Components/NavTabs';
import MentorList from "./Components/Mentor/MentorList";
import Button from '@material-ui/core/Button';
import StudentsList from "./Components/students/StudentsList"
import StudentsHandledByMentor from "./Components/Mentor/StudentsHandledByMentor"
// import { useState } from 'react';
import CreateNewForm from "./Components/CreateNewForm"
import AssignStudentsForm from "./Components/Mentor/AssignStudentsForm"


function App() {
  
  const history=useHistory()
  return (
    <div className="App">
      <header className="header-class">
        <div className="page-title">Menter and Student Assigning App</div>
        {/* NavTabs for All mentors and All Students */}
        <NavTabs/>
      </header>

      {/* Routes to switch based on user action */}
      <section className="section-class">
        
        <Switch>
          
          <Route path="/allStudents">
            <br/>
            <Button variant="contained" color="secondary" onClick={()=>{history.push("/createNew/student")}}>Add New Student</Button>
            <hr/>
            <StudentsList/>
          </Route>
          <Route path="/studentsHandled/:id/:name">
            <br/>
            <StudentsHandledByMentor useParams={useParams}/>
          </Route>
          <Route path="/createNew/:category">
            <br/>
            <CreateNewForm useParams={useParams}/>
          </Route>
          <Route path="/assignStudents/:id/:name">
            <br/>
            <AssignStudentsForm useParams={useParams}/>
          </Route>
          <Route exact path="/">
            <br/>
            
            <Button variant="contained" color="secondary" onClick={()=>{history.push("/createNew/mentor")}}>Add New Mentor</Button>
            <hr/>
            <MentorList/>
          </Route>
          
        </Switch>
      </section>
    </div>
  );
}

export default App;
