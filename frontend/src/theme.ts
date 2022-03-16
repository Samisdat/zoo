import { createTheme } from '@mui/material/styles';

import '@fontsource/source-sans-3/200.css';
import '@fontsource/source-sans-3/300.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/500.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';
import '@fontsource/source-sans-3/800.css';
import '@fontsource/source-sans-3/900.css';
import {grey} from '@mui/material/colors';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#00a800',
      light: '#f00'
    },
    secondary: {
      main: '#11cb5f',
    },
    background:{
      default: grey[300]
    }
  },
  typography:{
    fontFamily: [
      '"Source Sans 3"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),

    h1:{
      fontSize:38,
      fontWeight: 400,
      color: 'black'
    },
    h2:{
      //fontSize:26,
      fontSize:34,
      fontWeight: 400,
      color: 'black'
    },
    h3:{
      fontSize:30,
      fontWeight: 400,
      color: 'black'
    },
    h4:{
      fontSize:26,
      fontWeight: 400,
      color: 'black'
    },
    h5:{
      fontSize:22,
      fontWeight: 400,
      color: 'black'
    },
    h6:{
      fontSize:18,
      fontWeight: 400,
      color: 'black'
    },
    subtitle1:{
      fontSize:18,
      fontWeight: 400,
      color: 'black'
    },
    subtitle2:{
      fontSize:18,
      fontWeight: 400,
      color: 'black'
    },
    body1:{
      fontSize:18,
      fontWeight: 300,
      color: 'black'
    },
    body2:{
      fontSize:18,
      fontWeight: 300,
      color: 'black'
    },
    /*
    button:{
      fontSize:25,
      fontWeight: 400
    },
    */
    caption:{
      fontSize:25,
      fontWeight: 400
    },
    overline:{
      fontSize:25,
      fontWeight: 400
    },
  }

});