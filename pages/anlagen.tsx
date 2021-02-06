import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import {getOneGeoJson} from "./api/geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";
import {getFullGeoJson} from "./api/geojson/list";
import path from "path";
import fs from "fs";
import {facilityUrlPart} from "../constants";
const frontmatter = require('@github-docs/frontmatter')

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

export const ListItemLink = (props)  => {
    return <ListItem button component="a" {...props} />;
}

export default function Index(props) {

  const classes = useStyles();

    let group = props.facilities
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
                  {group[key].map(( facility: any ) => {
                      const href =  `/${facilityUrlPart}/${facility.slug}`
                      return (
                          <ListItem button>
                              <ListItemLink href={href}>{facility.name}</ListItemLink>
                          </ListItem>
                      );
                  })}
              </React.Fragment>
          })}

  </List>
  );
}



export async function getStaticProps({ params, preview = false, previewData }) {

    const getJson = await getFullGeoJson();

    const facilities = getJson.features
        .filter((feature:Feature)=>{
            return ('facility-box' === feature.properties.type);
        })
        .map((feature:Feature)=>{
            return feature.properties;
    });

    const dataDir = path.resolve(process.env.PWD, 'data/markdown/facility');
    for(const facility of facilities){

        const facilityFilePath = path.resolve(dataDir, facility.slug + '.md');

        if (true === fs.existsSync(facilityFilePath)) {
            continue;
        }

        const markdown = 'Some Content';

        const data = {
            title: facility.name,
            slug: facility.slug,
            type: 'enclosure'
        };

        const markdownFileContent = frontmatter.stringify(markdown, data);

        console.log(markdownFileContent)

        fs.writeFileSync(facilityFilePath, markdownFileContent, {encoding:'utf8'});

    }

    return {
        props: {
            facilities: facilities,
        },
    }
}