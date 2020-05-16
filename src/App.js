import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import logo from './assets/shelter-stats.png';
import { withStyles } from '@material-ui/core/styles';
import Cats from './Cats';
import WeightForm from './WeightForm';
import Button from '@material-ui/core/Button';
import AppBar from './Bar';
import CatList from './CatList';

const styles = {
  root: {
  }
}

const App = (props) => {

  const { classes } = props;
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#38b6ff'
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar />
      <CatList/>
      {/* <WeightForm /> */}
    </ThemeProvider>
  );
}

export default (withStyles(styles)(App));
