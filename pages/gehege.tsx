import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import {getSpecies, Species} from "./api/species";
import {getOneGeoJson} from "./api/geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

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

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function Index(props) {

  const classes = useStyles();

    let group = props.gehege
        .reduce((r, e) => {
            let firstLetter = e.name[0].toLowerCase();

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


    const ordered = {};
    Object.keys(group).sort().forEach(function(key) {
        ordered[key] = group[key];
    });

    return (
  <List className={classes.list}>

      {Object.entries(ordered)
          .map(([key, value], i) => {
              return <React.Fragment>
                  <ListSubheader className={classes.subheader}>{key.toUpperCase()}</ListSubheader>
                  {group[key].map(( gehege: any ) => {
                      const href =  `/gehege/${gehege.slug}`
                      return (
                          <ListItem button>
                              <ListItemLink href={href}>{gehege.name}</ListItemLink>
                          </ListItem>
                      );
                  })}
              </React.Fragment>
          })}

  </List>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {

    const zoomBoxesGeoJson = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    let gehege = zoomBoxesGeoJson.features.map((feature:Feature<Polygon>)=>{
        return feature.properties;
    });

    gehege = gehege.sort( (a:any, b:any)=>{

        return a.name.localeCompare(b.name);

    });

    return {
        props: {
            gehege: gehege,
        },
    }
}