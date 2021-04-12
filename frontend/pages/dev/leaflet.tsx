import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('components/LeafletMap'), {
  ssr: false
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      text: {
        padding: theme.spacing(2, 2, 0),
      },
      paper: {
        paddingBottom: 50,
      },
      list: {
        marginBottom: theme.spacing(2),
      },
      subheader: {
        backgroundColor: theme.palette.background.paper,
      },
      appBar: {
        top: 'auto',
        bottom: 0,
      },
      grow: {
        flexGrow: 1,
      },
      fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
      },
    }),
);


export default function Index() {

  const classes = useStyles();

  return (
      <div>
        <LeafletMap></LeafletMap>
      </div>

  );
}
