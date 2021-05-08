import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import {animalUrlPart} from "../constants";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getAnimals} from "../strapi-api/query/animals";
import {Animal} from "../strapi-api/entity/animal/animal";

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

    Warehouse.get().hydrate(props.warehouse);

    const animals = Warehouse.get().getAnimals();

    const classes = useStyles();

    let group = animals
        .reduce((r, e) => {
            let firstLetter = e.title[0].toLowerCase();

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
  <List key={`list-animals`} className={classes.list}>

      {Object.entries(ordered)
          .map(([key, value], i) => {
              return <React.Fragment>
                  <ListSubheader className={classes.subheader}>{key.toUpperCase()}</ListSubheader>
                  {group[key].map(( animal: Animal ) => {
                      const href = `/${animalUrlPart}/${animal.slug}`

                      return(
                          <ListItemLink href={href}>{animal.title}</ListItemLink>
                      )}
                  )}
              </React.Fragment>
          })}

  </List>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {

    await getAnimals();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }
}