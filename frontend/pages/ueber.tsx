import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';

export default function Ueber() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <a className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabIndex={0}
           role="button" aria-disabled="false" href="/"><span
            className="MuiButton-label">Go to the main page</span><span className="MuiTouchRipple-root"></span></a>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
