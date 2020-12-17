import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import NavigationMain from '../components/Navigation/Main';
import NavigationSidebar from '../components/Navigation/Sidebar';
import NavigationSearch from '../components/Navigation/Search';

import { makeStyles } from '@material-ui/core/styles';
import {NavigationInterface} from "../components/Navigation/Interfaces";

import createPersistedState from 'use-persisted-state';
import {d3PropertiesDefault} from "../components/D3/Map";
const useNavigationState = createPersistedState('navigation');


const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

export default function ZooWuppertal(props) {

  const { Component, pageProps } = props;

  const [navigationState, setNavigationState] = useNavigationState(pageProps.navigation);

  const toggleSearch = () => {

      const open = (true === navigationState.openSearch) ? false : true;

      setNavigationState({
          ...navigationState,
          openSearch:open
      });

  };



    const toggleSideMenu = () => {

        const open = (true === navigationState.openSideMenu) ? false : true;

        setNavigationState({
            ...navigationState,
            openSideMenu:open
        });

    };

    React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    /*
    if(true === navigationState.openSearch){
        return;
    }

    window.setTimeout(()=>{
        toggleSearch();
    }, 300)
    */

  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <title>Der grüne Zoo Wuppertal</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" crossOrigin=""/>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
          <Grid container>
              <Grid item xs={12}>
                  <Component {...pageProps} />
              </Grid>
          </Grid>
          <NavigationMain toggleSideMenu={toggleSideMenu} toogleSearch={toggleSearch} {...navigationState}></NavigationMain>
          <NavigationSidebar toggleSideMenu={toggleSideMenu} {...navigationState}></NavigationSidebar>
          <NavigationSearch toggleSearch={toggleSearch} {...navigationState} {...props}></NavigationSearch>
      </ThemeProvider>
    </React.Fragment>
  );
}

ZooWuppertal.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
