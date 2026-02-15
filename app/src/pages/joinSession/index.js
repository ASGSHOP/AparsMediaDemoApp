import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { Box, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TYPE } from '../../config';
import JoinSessionForm from './joinForm';
import { joinSession } from '../../api.service';
import { makeid } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#E8F1FE',
    [theme.breakpoints.down(600)]: {
      backgroundColor: 'white',
    },
  },
}));

function JoinMeeting(props) {
  const classes = useStyles();
  const params = useRouteMatch();
  const location = useLocation();
  const [sessionUrl, setSessionUrl] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [isApiCallInProcess, setIsApiCallInProcess] = useState(false);
  const { setHideNavbar } = props;

  useEffect(() => {
    if (params.params && params.params.meetingId) {
      setMeetingId(params.params.meetingId);
    }
  }, []);

  let userType = 1;
  let joiningMessage = '';
  if (/^\/n/.test(location.pathname) === true) {
    userType = TYPE.NORMAL;
  } else if (/^\/stream/.test(location.pathname) === true) {
    userType = TYPE.OBSERVER;
    joiningMessage = 'You are joining as an observer';
  } else {
    userType = TYPE.COHOST;
    joiningMessage = 'You are joining as a co-teacher';
  }

  const handleJoinSession = (userObject) => {
    setIsApiCallInProcess(true);

    const userJoinObj = {
      fullName: userObject.name,
      userId: makeid(12),
      meetingId: meetingId,
      type: userType,
    };
    console.log(userJoinObj, 'userobj');
    joinSession(userJoinObj)
      .then(async (res) => {
        const data = await res.json();
        setIsApiCallInProcess(false);
        if (data.success) {
          setSessionUrl(data.data);
          setHideNavbar(true);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        setIsApiCallInProcess(false);
        toast.error('Server not found');
      });
  };

  return (
    <Box className={classes.formContainer}>
      <Backdrop open={isApiCallInProcess} style={{ zIndex: 1 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      {sessionUrl ? (
        <iframe
          title="Meeting"
          className="iframe"
          src={sessionUrl}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          allowFullscreen
          scrolling="no"
          overflow="hidden"
          marginwidth="0"
          marginheight="0"
          frameborder="0"
          position="absolute"
          height="100%"
          width="100%"
          inset="0px"
        ></iframe>
      ) : (
        <JoinSessionForm
          handleJoinSession={handleJoinSession}
          joiningMessage={joiningMessage}
        />
      )}
    </Box>
  );
}

export default JoinMeeting;
