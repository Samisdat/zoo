import React from 'react';
import {ViewportProvider} from "../components/viewport/ViewportProvider";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {background} from "@storybook/theming";

const theme = createTheme({
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
            default:'#E8E8E8',
        }
    },
});

export const decorators = [
  (Story) => (
      <div style={{background:'#E8E8E8'}}>
      <ViewportProvider>
        <ThemeProvider theme={theme}>


        <Story />
        </ThemeProvider>
      </ViewportProvider>
      </div>

),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}