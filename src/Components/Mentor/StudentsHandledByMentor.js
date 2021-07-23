import { useState } from "react";
import { useEffect } from "react"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';


export default function StudentsHandledByMentor({useParams,currentMentor}){
    const {id,name}=useParams()
    const history=useHistory()
    
    const [studentsHandledByMentor,setStudentsHandledByMentor]=useState([])
    useEffect(() => {
        let dataFun = async () => {
          let data = fetch(`https://assign-mentor-server.herokuapp.com/studentsAssignedToMentor/${id}`, {
            method: "GET"
          });
          const result = await data;
          const res = await result.json();
          setStudentsHandledByMentor(res);
        };
        dataFun();
      }, []);
    return(
        <Container>
          <Button
            style={{float:"left"}}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<ArrowBackIcon />}
            onClick={()=>{history.goBack()}}
        >
            Go Back
        </Button>
        <br/>
        <h1>Students handled by Mentor:{name}</h1>
        
      {studentsHandledByMentor.length?(studentsHandledByMentor.map((student) => (
        <Card key={student._id.toString()} id="display_card">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={student.avatar}>
                R
              </Avatar>
            }
            title={student.studentName}
            
            subheader={student.studentEmail}
            
          />
          <hr/>
        </Card>
      ))):`This mentor is not handling any students`}
        </Container>
    )
}