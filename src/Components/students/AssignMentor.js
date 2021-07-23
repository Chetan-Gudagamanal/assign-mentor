import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';
import DisplayChooseMentorForm from "./DisplayChooseMentorForm.js"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AssignMentor({student,getStudents}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  }));
  const classes = useStyles();

  const [allMentors, setAllMentors]=useState([]);
  useEffect(()=>{
    getAllMentors()
  },[])
  const getAllMentors=async ()=>{
    let rawData=await fetch("https://assign-mentor-server.herokuapp.com/allMentors",{method:"GET"})
    let jsonData=await rawData.json();
    setAllMentors(jsonData)
}

  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen}>Change/Assign New Mentor</Button>
        
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <p>Updating Mentor for - {student.studentName}<br/><span style={{fontSize:"0.6em"}}>Current Mentor is - {student.assignedMentor?`${student.assignedMentor.name}(${student.assignedMentor.id})`:`No mentor assigned yet`}</span></p>
          
        </DialogTitle>
        <DialogContent dividers>
            <DisplayChooseMentorForm student={student} allMentors={allMentors} getStudents={getStudents}/>
          
        </DialogContent>
        
      </Dialog>
    </div>
  );
}