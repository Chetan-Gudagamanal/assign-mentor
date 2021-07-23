

import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

export default function AssignStudentsForm({useParams}) {
    const {id,name}=useParams()
    const history=useHistory()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        let formOutput=JSON.stringify(data)
        let myObj=JSON.parse(formOutput)
        for(let i in myObj){console.log(i)}
        console.log(formOutput)
        let tempObj={};
        let tempArr=[];
        for(let i in myObj){
            if(myObj[i]){
                tempArr.push(i)
            }
        }
        if(tempArr.length){
            tempObj["studentIds"]=tempArr
            console.log(tempObj)
            const assignStudentsFun=async ()=>{
                let rawData=await fetch(`https://assign-mentor-server.herokuapp.com/assignStudents/${id}`,{
                    method:"PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tempObj)
                })
                let jsonData=await rawData.json();
                alert("Students assigned Successfully")
            }
            assignStudentsFun()

        } else{
            alert("No students chosen")
        }
      
    };
  
    
    const [unAssignedStudents, setUnAssignedStudents]=useState([]);
    useEffect(()=>{
        getUnAssignedStudents()
    },[])
    const getUnAssignedStudents=async ()=>{
        let rawData=await fetch("https://assign-mentor-server.herokuapp.com/unAssignedStudents",{method:"GET"})
        let jsonData=await rawData.json();
        setUnAssignedStudents(jsonData)
    }
    return (
        <Container>
            <Button
                style={{float:"left"}}
                variant="contained"
                color="secondary"
                
                startIcon={<ArrowBackIcon />}
                onClick={()=>{history.goBack()}}
            >
                Go Back
            </Button>
            <br/>
            
        <h1>Assign Students to Mentor: {name}</h1>
        <div className="MyForm">
        <form onSubmit={handleSubmit(onSubmit)}>
   
          <fieldset>
            <legend>Choose the Students to be assigned to the current mentor</legend>
            <br/>
            <p style={{color:"#fa1515"}}>Only List of students for whoom mentor is not assigned is displayed here</p>
            {unAssignedStudents.length?unAssignedStudents.map((student,i)=>(<Card key={student._id.toString()} id="display_card">
                <label><input type="checkbox" name="sameName" value={student._id} {...register(student._id,)} />{student.studentName}</label><hr/>
            </Card>)
            ):<h1>Nothing to Display</h1>}
            
            
          </fieldset>
          <input type="submit" />
        </form>
      </div>
      </Container>
    );
  }