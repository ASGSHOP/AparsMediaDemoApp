import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    height: '40px',
    display: 'flex',
    width: '100%',
    backgroundColor: '#E8F1FE',
    padding: '10px 30px',
    marginTop: '10px',
    [theme.breakpoints.down(600)]: {
      backgroundColor: 'white',
      padding: '15px 15px',
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>
      <Box>
        <img src={logo} alt={'logo'} />
      </Box>
    </Box>
  );
};

export default NavBar;
