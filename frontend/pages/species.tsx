import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import {Species} from "./api/species";

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


export default function Index(props) {

  const classes = useStyles();

    const group = props.species
        .sort((a, b) => {
            a.species.localeCompare(b.species)
        })
        .reduce((r, e) => {
            let firstLetter = e.species[0].toLowerCase();

            firstLetter = firstLetter
                .replace('ä', 'a')
                .replace('ü', 'u')
                .replace('ö', 'o')
            ;

            if(undefined === r[firstLetter]) {
                r[firstLetter] = []
            }

            r[firstLetter].push(e);

            return r;

        }, {});

  return (
  <List className={classes.list}>

      {Object.entries(group)
          .map(([key, value], i) => {
              return <React.Fragment>
                  <ListSubheader className={classes.subheader}>{key}</ListSubheader>
                  {group[key].map(( species: Species ) => (
                          <ListItem button>
                              <ListItemText primary={species.species} secondary={species.species} />
                          </ListItem>
                  ))}
              </React.Fragment>
          })}
          
  </List>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {


    const response = await fetch('http://127.0.0.1:8080/api/species')
    let json = await response.json();

    /*
    const species:any = {};

    for(const aSpecies of json){

        const firstLetter = aSpecies.species.charAt(0)

        if(undefined === species[firstLetter]){
            species[firstLetter] = [];
        }

        species[firstLetter].push(aSpecies)

    }
    */
    return {
        props: {
            species: json,
        },
    }
}