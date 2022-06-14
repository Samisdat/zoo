import React from 'react';

import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {theme} from "../src/theme";
import {ViewportProvider} from "../components/viewport/ViewportProvider";

export const decorators = [
    (Story) => (
        <ViewportProvider>

            <ThemeProvider theme={theme}>

                <CssBaseline/>

                <Story/>

            </ThemeProvider>
        </ViewportProvider>
    ),
];

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}