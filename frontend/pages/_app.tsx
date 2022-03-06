import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import {ViewportProvider} from "components/viewport/ViewportProvider";
import {Navigation} from "components/Navigation/Navigation";
import {navigationCategories} from "components/Navigation/NavigationCategory";

const theme = createTheme({
    palette: {
        primary: {
            main: '#00a800',
            light: '#f00'
        },
        secondary: {
            main: '#11cb5f',
        },
        background:{
            default:'#E8E8E8',
        }
    },
});

const Content = styled('div')({
    position: 'relative',
    width: '100%',
    background:'green'
})

const LayoutContainer = (props) => {

    const {router, children} = props;

    if('/' === router.pathname){
        return (
            <React.Fragment>
                {children}
            </React.Fragment>);
    }

    return (
        <Container
            maxWidth="md"
        >
            {children}
        </Container>
    );

}


export default function ZooWuppertal(props) {

    const {Component, pageProps, router} = props;


    React.useEffect(() => {

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

    }, []);

    return (
        <ViewportProvider>
        <ThemeProvider theme={theme}>
            <Head>
                <title>Der grüne Zoo Wuppertal</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
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
                    <Content>
                        <Component
                            {...pageProps}
                        />

                    </Content>
                </LayoutContainer>
        </ThemeProvider>
        </ViewportProvider>
    );
}

ZooWuppertal.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
