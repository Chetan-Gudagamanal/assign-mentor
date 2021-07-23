

import { useForm } from "react-hook-form";
import { Container } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: "100%",
//     backgroundColor: "white"
//   }
// }));

export default function CreateNewForm({useParams}) {
    const {category}=useParams()
    const history=useHistory()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();


  const onSubmit = (data) => {
    
    const updateMentor=async ()=>{
        let url=(category=="mentor")?"https://assign-mentor-server.herokuapp.com/addMentor":"https://assign-mentor-server.herokuapp.com/addStudent"
        let rawData=await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let jsonData=await rawData.json();
        alert("created successfully")
    }
    updateMentor()
  };
  // const classes = useStyles();
  return (
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
        
      <div className="MyForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add New {category}</h1>

          <CustomNameInput
            label={(category=="mentor")?"mentorName":"studentName"}
            register={register}
            errors={errors}
          />
          <CustomNameInput
            label={(category=="mentor")?"mentorEmail":"studentEmail"}
            register={register}
            errors={errors}
          />
          

          <input type="submit" />
        </form>
      </div>
    </Container>
  );
}

function CustomNameInput({ label, register, errors }) {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={label}
        {...register(label, {
          required: true,
          minLength: 3
        })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p style={{ color: "red" }}>This input is required</p>
      )}

      {errors[label] && errors[label].type === "minLength" && (
        <p style={{ color: "red" }}>Min Length should be 3</p>
      )}
    </>
  );
}



