import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {ListItemLink} from "./anlagen";
import {Warehouse} from "strapi-api/warehouse/warehouse";
import {getPhotos} from "../strapi-api/query/photos";
import {Photo} from "../strapi-api/entity/photo/photo";

export default function Photos(props) {

    Warehouse.get().hydrate(props.warehouse);

    const photos = Warehouse.get().getPhotos();

    return (
        <List>
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