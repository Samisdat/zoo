/**
 * Uses code from
 * https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/pages/_app.tsx
 */

import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {theme} from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

import {ViewportProvider} from 'components/viewport/ViewportProvider';
import {Navigation} from 'components/Navigation/Navigation';
import {navigationCategories} from 'components/Navigation/NavigationCategory';
import {useRouter} from 'next/router';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


const LayoutContainer = (props) => {

    const {router, children} = props;

    if('/map' === router.pathname){
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }

    return (
                {children}


    );

}

interface ZooWuppertalProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function ZooWuppertal(props:ZooWuppertalProps) {

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const router = useRouter();

    return (
        <CacheProvider value={emotionCache}>
        <ViewportProvider>

        <ThemeProvider theme={theme}>
            <Head>
                <title>Der grüne Zoo Wuppertal</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                {/* */}
                <Navigation
                    categories={navigationCategories}
                />
                {/*
                <LayoutContainer
                    router={router}
                    {...props}
                >
                */}

                    <Component
                        {...pageProps}
                    />
                {/* </LayoutContainer>*/}
            </ThemeProvider>

        </ViewportProvider>
        </CacheProvider>
    );
}

/*
ZooWuppertal.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
*/