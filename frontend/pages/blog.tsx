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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function Blog(props) {

    Warehouse.get().hydrate(props.warehouse);

    const posts = Warehouse.get().getPosts();

  const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                posts.map( (post:Post) => {
                    const href =  `/${blogUrlPart}/${post.slug}`
                    return (
                        <ListItem key={post.slug}>
                            <ListItemLink href={href}>
                                {post.title} - <Moment format="DD.MM.YYYY" date={post.date} /><br/>
                            </ListItemLink>
                        </ListItem>
                    );
                })
            }
        </List>
    );
}



export async function getStaticProps({ params, preview = false, previewData }) {

    /*
    let newsPosts = await list();

    newsPosts = newsPosts
        .sort((a,b) =>{

            if (a.date < b.date) {
                return -1;
            }

            if (a.date > b.date) {
                return 1;
            }
            // a muss gleich b sein
            return 0;
        })
        .reverse()
        .map(( newsPost)=>{
            newsPost.date = (newsPost.date as any).toISOString();
            return newsPost;

        });
    */
    await getPosts();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}