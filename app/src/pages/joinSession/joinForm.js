import React, { useState } from 'react';
import {
  makeStyles,
  FormLabel,
  TextField,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import joinSessionImg from '../../assets/joinsessionImg.svg';
import secureImg from '../../assets/secure.svg';
import { useRouteMatch } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  joinForm: {
    backgroundColor: 'white',
    width: '440px',
    height: '520px',
    padding: '18px',
    [theme.breakpoints.down(600)]: {
      backgroundColor: 'white',
    },
    boxShadow: '0px 0px 20px 0px rgba(26, 57, 108, 0.05)',
    borderRadius: '10px',
  },
  joinImgBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '70px',
  },
  joinBtnBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '32px',
  },
  label: {
    marginBottom: '8px',
  },
  joinBtn: {
    backgroundColor: '#1DA1F',
  },
  root: {
    backgroundColor: 'rgba(29, 161, 242, 1)',
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: 'rgba(29, 161, 242, 1)',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: 'rgba(29, 161, 242, 1)',
    },
    boxShadow: 'none',
    padding: '12px',
  },
  secureTxt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25px',
  },
  copytxt: {
    color: '#6B82AB',
    fontSize: '14px',
  },
}));

const JoinSessionForm = (props) => {
  const { handleJoinSession, joiningMessage } = props;
  const [name, setName] = useState('');
  const handleJoinClick = () => {
    if (name !== '') {
      handleJoinSession({ name: name });
    }
  };
  const params = useRouteMatch();

  const classes = useStyles();
  return (
    <Box className={classes.joinForm}>
      <Box className={classes.joinImgBox}>
        <img src={joinSessionImg} alt="" />
        <Typography variant="p" className={classes.heading}>
          Join meeting
        </Typography>
        <Typography variant="h5" style={{ marginTop: '20px' }}>
          {params.params.meetingId &&
            params.params.meetingId.replaceAll('-', ' ')}
        </Typography>
      </Box>
      <Box className={classes.inputField}>
        <FormLabel className={classes.label}>Your Name</FormLabel>
        <TextField
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="fullName"
          value={name}
          type="text"
          id="outlined-basic"
          placeholder="Enter your name"
          variant="outlined"
          color="primary"
          size="small"
        />
        <Typography variant="p" className={classes.copytxt}>
          {joiningMessage}
        </Typography>
      </Box>
      <Box className={classes.secureTxt}>
        <Typography style={{ display: 'flex', alignItems: 'center' }}>
          <img src={secureImg} alt="secire" style={{ marginRight: '5px' }} />
          Your class is secure.
        </Typography>
      </Box>
      <Box className={classes.joinBtnBox}>
        <Button
          fullWidth
          variant="contained"
          type="button"
          disabled={name === ''}
          onClick={handleJoinClick}
          className={classes.root}
        >
          Join Meeting
        </Button>
      </Box>
    </Box>
  );
};

export default JoinSessionForm;
