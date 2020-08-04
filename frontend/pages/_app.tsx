import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

import AppBar from '../components/AppBar';
import Grid from "@material-ui/core/Grid";

import '../styles/styles.css'

export default function ZooBackend(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" crossOrigin=""/>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
            <Grid container>
                <Grid item xs={12}>
                    <AppBar {...props}></AppBar>
                </Grid>
                <Grid item xs={12}>
                    <Component {...pageProps} />
                </Grid>
            </Grid>
        </ThemeProvider>
      </React.Fragment>
  );
}

ZooBackend.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
