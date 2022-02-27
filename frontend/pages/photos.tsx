import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Moment from 'react-moment';

import {ListItemLink} from "./anlagen";
import {blogUrlPart} from "../constants";
import {getPosts} from "strapi-api/query/posts";
import {Warehouse} from "strapi-api/warehouse/warehouse";
import {Post} from "strapi-api/entity/post/post";
import {getPhotos} from "../strapi-api/query/photos";
import {Photo} from "../strapi-api/entity/photo/photo";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function Photos(props) {

    Warehouse.get().hydrate(props.warehouse);

    const photos = Warehouse.get().getPhotos();
    console.log(photos)

  const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                photos.map( (photo:Photo) => {
                    const href =  `/photos/${photo.id}`
                    return (
                        <ListItem key={photo.id}>
                            <ListItemLink href={href}>
                                {photo.title}
                            </ListItemLink>
                        </ListItem>
                    );
                })
            }
        </List>
    );
}



export async function getStaticProps({ params, preview = false, previewData }) {

    await getPhotos();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}