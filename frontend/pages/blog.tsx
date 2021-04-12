import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Moment from 'react-moment';

import {ListItemLink} from "./anlagen";
import {blogUrlPart} from "../constants";
import {list} from "../data-repos/post";

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

  const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                props.newsPosts.map( (newsPost) => {
                    const href =  `/${blogUrlPart}/${newsPost.slug}`
                    return (
                        <ListItem key={newsPost.slug}>
                            <ListItemLink href={href}>
                                {newsPost.title} - <Moment format="DD.MM.YYYY" date={newsPost.date} /><br/>
                            </ListItemLink>
                        </ListItem>
                    );
                })
            }
        </List>
    );
}



export async function getStaticProps({ params, preview = false, previewData }) {

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

    return {
        props: {
            newsPosts:newsPosts
        },
    }
}