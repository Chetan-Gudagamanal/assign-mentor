import { useState } from "react"
import { useEffect } from "react"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import AssignMentor from "./AssignMentor"


export default function StudentsList(){
    const [studentsList,setStudentsList]=useState([]);
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        getStudents()
    },[])

    const getStudents=async ()=>{
        let rawData=await fetch("https://assign-mentor-server.herokuapp.com/allStudents",{method:"GET"})
        let jsonData=await rawData.json();
        setStudentsList(jsonData)
        setLoading(false)
    }

    const useStyles = makeStyles((theme) => ({
        root:{
            backgroundColor:'#cdf8a9',
        },
        large: {
          width: theme.spacing(8),
          height: theme.spacing(8),
        },
        loading: {
            display: 'flex',
            '& > * + *': {
              marginLeft: theme.spacing(2),
            },
          },
      }));
      const classes = useStyles();
      if(loading){
        return (
            <div className={classes.loading} style={{display:'flex', justifyContent:'center'}}>
              <CircularProgress />
            </div>
          );
      }
    return(
        <>
        {studentsList.map((student)=>
            <Container key={student._id.toString()}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" src={student.avatar} className={classes.large}>
                            {student.studentName[0]}
                        </Avatar>
                        }
                        title={<h3>{`${student.studentName}  -${student.studentEmail}`}</h3>}
                        
                        subheader={student.assignedMentor?(
                        <p>Current Mentor:{` ${student.assignedMentor.name}  -(${student.assignedMentor.email})`}</p>
                        ):"No mentor assigned yet"}
                    />
                    
                    
                    <AssignMentor student={student} getStudents={getStudents}/>
                    
                    
                </Card>
                <br/>
            </Container>
        )}
        </>
    )
}