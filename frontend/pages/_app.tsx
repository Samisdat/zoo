import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import createPersistedState from 'use-persisted-state';

import { createMuiTheme } from '@material-ui/core/styles';
import {ViewportProvider} from "../components/viewport/ViewportProvider";
import {Navigation} from "../components/Navigation/Navigation";
import {navigationCategories} from "../components/Navigation/NavigationCategory";
import {relative} from "jest-haste-map/build/lib/fast_path";
import Container from "@material-ui/core/Container";

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#00a800',
            light: '#f00'
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
        background:{
            default:'#f5f5f5'
        }
    },
});



const useNavigationState = createPersistedState('navigation');
const useStyles = makeStyles((theme) => {

    return ({
        offset: theme.mixins.toolbar,
        content: {
            position: 'relative',
            width: '100%',
        }
    });

});

const LayoutContainer = (props) => {

    const {router, children} = props;

    if('/' === router.pathname){
        return (<React.Fragment>{children}</React.Fragment>);
    }

    return (
        <Container maxWidth="md">
            {children}
        </Container>
    );

}


export default function ZooWuppertal(props) {

    const {Component, pageProps, router} = props;

    const [navigationState, setNavigationState] = useNavigationState<NavigationInterface>({
        activeMainItem: 'map',
        openSideMenu: false,
        openTeaser: false
    });

    const toggleTeaser = () => {

        console.log('toggleTeaser')

        const open = (true === navigationState.openTeaser) ? false : true;

        setNavigationState({
            ...navigationState,
            openTeaser: open
        });

    };

    const toggleSideMenu = () => {

        const open = (true === navigationState.openSideMenu) ? false : true;

        setNavigationState({
            ...navigationState,
            openSideMenu: open
        });

    };

    React.useEffect(() => {

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

    }, []);

    const classes = useStyles();
    return (
        <ViewportProvider>
        <ThemeProvider theme={theme}>
            <Head>
                <title>Der grüne Zoo Wuppertal</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" crossOrigin=""/>
            </Head>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Navigation
                    categories={navigationCategories}
                />
                <LayoutContainer
                    router={router}
                    {...props}
                >
                    <div className={classes.content}>
                        <Component
                            toggleTeaser={toggleTeaser}
                            navigation={navigationState}
                            {...pageProps}
                        />
                    </div>
                </LayoutContainer>
        </ThemeProvider>
        </ViewportProvider>
    );
}

ZooWuppertal.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
