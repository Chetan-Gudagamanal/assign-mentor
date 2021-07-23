

import { useForm } from "react-hook-form";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

export default function DisplayChooseMentorForm({student,allMentors,getStudents}) {
    
  const {
    register,
    control,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    
    let bodyData={}
    bodyData["newMentorId"]=data.New_Mentor.split("-")[1]
    
    const updateMentor=async ()=>{
        let rawData=await fetch(`https://assign-mentor-server.herokuapp.com/assignMentor/${student._id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        })
        let jsonData=await rawData.json();
        getStudents()
        alert("Updated Mentor Successfully")
    }
    updateMentor()
    
  };
  const classes = useStyles();
  return (
    <Container>
      <div className="MyForm">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Choose a Mentor</h1>
          
          <Select
            label="New_Mentor"
            register={register}
            options={allMentors.map(mentor=>`${mentor.mentorName}-${mentor._id}`)}
          />
          <input type="submit" />
        </form>
      </div>
    </Container>
  );
}

function Select({ register, options, label, ...rest }) {
  return (
    <>
      <label>{label}</label>
      <select {...register(label)} {...rest}>
        {options.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </>
  );
}
