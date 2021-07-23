import { useState } from "react"
import { useEffect } from "react"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"


export default function MentorList(){
    const [mentorsList,setMentorsList]=useState([]);

    useEffect(()=>{
        getMentors()
    },[])

    const getMentors=async ()=>{
        let rawData=await fetch("https://assign-mentor-server.herokuapp.com/allMentors",{method:"GET"})
        let jsonData=await rawData.json();
        setMentorsList(jsonData)
    }

    const useStyles = makeStyles((theme) => ({
        root:{
            // backgroundColor:blue[50],
            backgroundColor:'#cdf8a9'
        },
        large: {
          width: theme.spacing(8),
          height: theme.spacing(8),
          
        },
      }));
      const classes = useStyles();
    return(
        <>
        {mentorsList.map((mentor)=>
            <Container key={mentor._id.toString()}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" src={mentor.avatar} className={classes.large}>
                            {mentor.mentorName[0]}
                        </Avatar>
                        }
                        title={<h3>{`${mentor.mentorName}  -${mentor.mentorEmail}`}</h3>}
                        
                    />
                    
                    <Link to={`/assignStudents/${mentor._id}/${mentor.mentorName}`}><Button variant="contained">Assign New Students</Button></Link>
                    
                    <Link to={`/studentsHandled/${mentor._id}/${mentor.mentorName}`}><Button variant="contained">Students Handled Currently</Button></Link>
                    
                </Card>
                <br/>
            </Container>
        )}
        </>
    )
}