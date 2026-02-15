import {
  makeStyles,
  Typography,
  FormLabel,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import React, { useState } from 'react';
import computerImg from '../../assets/computerImg.svg';

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: 'white',
    maxHeight: '650px',
    width: '440px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '18px',
    boxShadow: '0px 0px 20px 0px rgba(26, 57, 108, 0.05)',
    borderRadius: '10px',
    [theme.breakpoints.down(600)]: {
      height: '100%',
    },
  },
  InputField: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '21px',
  },
  computerImg: {
    height: '109px',
    width: '157px',
  },
  imgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '40px',
  },
  label: {
    marginBottom: '8px',
    color: '#1F3965',
  },
  startBtn: {
    backgroundColor: 'rgba(29, 161, 242, 1)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(29, 161, 242, 1)',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: 'rgba(29, 161, 242, 1)',
      opacity: 0.7,
    },
    padding: '13px',
    boxShadow: 'none',
  },
  btnBox: {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
  },
}));

const CreateSessionForm = (props) => {
  const { handleCreateSession } = props;
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [meetingName, setMeetingName] = useState('');

  const handleStartClassClick = () => {
    if (userName !== '' && meetingName !== '') {
      handleCreateSession({ name: userName, meetingName: meetingName });
    }
  };

  return (
    <Box
      className={classes.form}
      style={window.innerHeight < 768 ? { maxHeight: '550px' } : {}}
    >
      <Box
        className={classes.imgBox}
        style={window.innerHeight < 768 ? { marginBottom: '20px' } : {}}
      >
        <img className={classes.computerImg} src={computerImg} alt="Computer" />
        <Typography variant="p" color="#1DA1F1" component="p">
          Start your live session in just One click
        </Typography>
      </Box>

      <Box
        className={classes.InputField}
        style={window.innerHeight < 768 ? { paddingBottom: '8px' } : {}}
      >
        <FormLabel className={classes.label}>Your Name</FormLabel>
        <TextField
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="Eg. Rahim"
          variant="outlined"
          color="primary"
          size="small"
        />
      </Box>

      <Box
        className={classes.InputField}
        style={window.innerHeight < 768 ? { paddingBottom: '8px' } : {}}
      >
        <FormLabel className={classes.label}>
          Give a name to your live session
        </FormLabel>
        <TextField
          type="text"
          onChange={(e) => setMeetingName(e.target.value)}
          value={meetingName}
          placeholder="Eg. English"
          variant="outlined"
          size="small"
          color="primary"
        />
      </Box>

      <Box className={classes.btnBox}>
        <Button
          fullWidth
          variant="contained"
          type="button"
          onClick={handleStartClassClick}
          className={classes.startBtn}
          disabled={!userName || !meetingName}
        >
          Start Live
        </Button>
      </Box>
    </Box>
  );
};

export default CreateSessionForm;
