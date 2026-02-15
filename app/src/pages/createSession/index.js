import React, { useState } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  FormLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import CreateSessionForm from './createSessionForm';
import { createSession, joinSession, endStream } from '../../api.service';
import { generateHash } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  page: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#E8F1FE',
    padding: '18px',
    [theme.breakpoints.down(600)]: {
      backgroundColor: 'white',
      padding: '10px',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  linksCard: {
    backgroundColor: 'white',
    width: '440px',
    display: 'flex',
    flexDirection: 'column',
    padding: '18px',
    boxShadow: '0px 0px 20px 0px rgba(26, 57, 108, 0.05)',
    borderRadius: '10px',
    marginTop: '12px',
  },
  label: {
    marginTop: '12px',
    marginBottom: '8px',
    color: '#1F3965',
  },
  copytxt: {
    color: '#6B82AB',
    fontSize: '14px',
    marginTop: '6px',
  },
  meetingWrap: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px 0px rgba(26, 57, 108, 0.05)',
    overflow: 'hidden',
  },
  meetingHeader: {
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eef2f7',
  },
  iframe: {
    width: '100%',
    height: '100vh',
    border: '0px',
    display: 'block',
  },
  backBtn: {
    backgroundColor: '#1DA1F2',
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#1DA1F2',
      boxShadow: 'none',
    },
  },
}));

function CreateSession(props) {
  const { setHideNavbar } = props;
  const classes = useStyles();

  const [isApiCallInProcess, setIsApiCallInProcess] = useState(false);

  const [mode, setMode] = useState('create');

  const [hostSession, setHostSession] = useState(null);

  const [inviteLinks, setInviteLinks] = useState(null);

  const [endDialogOpen, setEndDialogOpen] = useState(false);

  const safeCopy = (text, msg) => {
    if (!text) return;
    if (window && window.navigator && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(text);
      toast.success(msg);
    } else {
      toast.error('Clipboard not supported in this browser');
    }
  };

  const extractRoomId = (created) => {
    var roomId = null;
    if (created && created.data && created.data.data) {
      roomId = created.data.data.id || created.data.data.roomId || null;
    }
    if (!roomId && created && created.data) {
      roomId = created.data.id || created.data.roomId || null;
    }
    if (!roomId && created) {
      roomId = created.id || created.roomId || null;
    }
    return roomId;
  };

  const extractJoinData = (joinJson) => {
    var embedUrl = null;
    var token = null;

    if (typeof joinJson === 'string') {
      embedUrl = joinJson;
      token = null;
      return { embedUrl: embedUrl, token: token };
    }

    if (joinJson && joinJson.data) {
      if (typeof joinJson.data === 'string') embedUrl = joinJson.data;
      else {
        embedUrl =
          joinJson.data.embed_url ||
          joinJson.data.embedUrl ||
          joinJson.data.url ||
          null;
        token = joinJson.data.token || null;
      }
    }

    if (!embedUrl && joinJson) {
      embedUrl =
        joinJson.embed_url || joinJson.embedUrl || joinJson.url || null;
      token = joinJson.token || token;
    }

    return { embedUrl: embedUrl, token: token };
  };

  const joinAndGetData = async (roomId, role, displayName) => {
    var joinBody = {
      userId: generateHash(displayName + '-' + role).toString(),
      userName: displayName,
      role: role,
      roomId: roomId,
    };

    var res = await joinSession(joinBody);
    if (!res.ok) throw new Error(await res.text());

    var json = await res.json();
    var parsed = extractJoinData(json);

    if (!parsed.embedUrl) {
      throw new Error('Join succeeded but embed url missing.');
    }
    return parsed;
  };

  const handleCreateSession = async (sessionFormData) => {
    setIsApiCallInProcess(true);

    try {
      var sessionObj = {
        name: sessionFormData.meetingName,
        description: '',
        hostId: generateHash(sessionFormData.name).toString(),
        hostName: sessionFormData.name,
        scheduledAt: new Date().toISOString(),
        duration: 60,
        maxParticipants: 100,
        chat: true,
        recording: true,
      };

      var createRes = await createSession(sessionObj);
      if (!createRes.ok) {
        setIsApiCallInProcess(false);
        toast.error(await createRes.text());
        return;
      }

      var created = await createRes.json();
      var roomId = extractRoomId(created);

      if (!roomId) {
        setIsApiCallInProcess(false);
        toast.error('Create succeeded but roomId not found in response.');
        return;
      }

      var hostJoin = await joinAndGetData(roomId, 'host', sessionFormData.name);

      var studentJoin = await joinAndGetData(roomId, 'student', 'Student');
      var coTeacherJoin = await joinAndGetData(
        roomId,
        'co-teacher',
        'Co-Teacher'
      );

      setHostSession({
        roomId: roomId,
        embedUrl: hostJoin.embedUrl,
        token: hostJoin.token,
      });

      setInviteLinks({
        studentUrl: studentJoin.embedUrl,
        coTeacherUrl: coTeacherJoin.embedUrl,
      });

      setIsApiCallInProcess(false);
      setHideNavbar(true);

      setMode('meeting');
    } catch (err) {
      setIsApiCallInProcess(false);
      toast.error(err && err.message ? err.message : 'Server not found');
    }
  };

  const onClickBackToCreate = () => {
    setEndDialogOpen(true);
  };

  const onCancelEnd = () => {
    setEndDialogOpen(false);
  };

  const onConfirmEndAndBack = async () => {
    setEndDialogOpen(false);

    if (!hostSession || !hostSession.roomId) {
      setMode('create');
      setHostSession(null);
      setInviteLinks(null);
      setHideNavbar(false);
      return;
    }

    setIsApiCallInProcess(true);

    try {
      var res = await endStream({
        roomId: hostSession.roomId,
        token: hostSession.token,
      });

      if (!res.ok) {
        setIsApiCallInProcess(false);
        toast.error(await res.text());
        return;
      }

      setIsApiCallInProcess(false);
      toast.success('Stream ended');

      setMode('create');
      setHostSession(null);
      setInviteLinks(null);
      setHideNavbar(false);
    } catch (err) {
      setIsApiCallInProcess(false);
      toast.error(err && err.message ? err.message : 'Failed to end stream');
    }
  };

  return (
    <Box className={classes.page}>
      <Backdrop open={isApiCallInProcess} style={{ zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />

      {mode === 'create' ? (
        <Box className={classes.center}>
          <CreateSessionForm handleCreateSession={handleCreateSession} />
        </Box>
      ) : (
        <Box>
          <Box className={classes.meetingWrap}>
            <Box className={classes.meetingHeader}>
              <Typography style={{ color: '#1F3965', fontWeight: 600 }}>
                Live Session
              </Typography>

              <Button
                variant="contained"
                className={classes.backBtn}
                onClick={onClickBackToCreate}
              >
                Back to create new session
              </Button>
            </Box>

            <iframe
              title="Meeting"
              className={classes.iframe}
              src={hostSession ? hostSession.embedUrl : ''}
              allow="camera; microphone; fullscreen; speaker; display-capture"
              allowFullScreen
              scrolling="no"
            />
          </Box>

          {inviteLinks ? (
            <Box className={classes.center}>
              <Box className={classes.linksCard}>
                <Typography style={{ color: '#1F3965', fontWeight: 600 }}>
                  Invite Links
                </Typography>

                <FormLabel className={classes.label}>Student Link</FormLabel>
                <OutlinedInput
                  value={inviteLinks.studentUrl || ''}
                  readOnly
                  fullWidth
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          safeCopy(
                            inviteLinks.studentUrl,
                            'Student link copied'
                          )
                        }
                      >
                        <FileCopy />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography variant="p" className={classes.copytxt}>
                  Students can join using this link
                </Typography>

                <FormLabel className={classes.label}>Co-Teacher Link</FormLabel>
                <OutlinedInput
                  value={inviteLinks.coTeacherUrl || ''}
                  readOnly
                  fullWidth
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          safeCopy(
                            inviteLinks.coTeacherUrl,
                            'Co-teacher link copied'
                          )
                        }
                      >
                        <FileCopy />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography variant="p" className={classes.copytxt}>
                  Co-teachers can join using this link
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
      )}

      <Dialog open={endDialogOpen} onClose={onCancelEnd}>
        <DialogTitle>End stream?</DialogTitle>
        <DialogContent>
          <Typography>
            You need to end the stream before creating a new session. End the
            stream now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelEnd}>No</Button>
          <Button
            onClick={onConfirmEndAndBack}
            color="primary"
            variant="contained"
          >
            Yes, end stream
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateSession;
