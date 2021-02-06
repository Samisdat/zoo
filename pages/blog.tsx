import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment';

import path from "path";
import fs from "fs";
import {ListItemLink} from "./anlagen";
import {blogUrlPart} from "../constants";

const frontmatter = require('@github-docs/frontmatter')
const ReactMarkdown = require('react-markdown')
const gfm = require('remark-gfm')

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

    const dataDir = path.resolve(process.env.PWD, 'data/markdown/news');

    const newsPostFiles = fs.readdirSync(dataDir);

    let newsPosts = [];

    for(const newsPostFile of newsPostFiles){

        if('.DS_Store' === newsPostFile){
            continue;
        }

        const newsFilePath = path.resolve(dataDir, newsPostFile);

        if (false === fs.existsSync(newsFilePath)) {
            continue;
        }

        const newsFileContent = fs.readFileSync(newsFilePath, {encoding:'utf8'});

        const { data, content, errors } = frontmatter(newsFileContent);
        const { title, slug, date, animal, enclosure } = data;

        newsPosts.push({
            title,
            slug,
            date,
            animal,
            enclosure,
            content
        });

    }

    newsPosts = newsPosts
        .sort((a,b) =>{

            if (a < b) {
                return -1;
            }

            if (a > b) {
                return 1;
            }
            // a muss gleich b sein
            return 0;
        })
        .reverse()
        .map(( newsPost)=>{
            newsPost.date = newsPost.date.toISOString();
            return newsPost;

        });

    return {
        props: {
            newsPosts:newsPosts
        },
    }
}