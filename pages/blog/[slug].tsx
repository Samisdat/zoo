import React from 'react';
import {Feature} from "geojson";
import {getFullGeoJson} from "../api/geojson/list";
import path from "path";
import fs from "fs";
import Moment from "react-moment";
const frontmatter = require('@github-docs/frontmatter')

const ReactMarkdown = require('react-markdown')
const gfm = require('remark-gfm')

export default function Gehege(props) {

    return (
        <React.Fragment>
            <h1>{props.title}</h1>
            <h2><Moment format="DD.MM.YYYY" date={props.date} /></h2>
            <ReactMarkdown plugins={[gfm]} children={props.content} />
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const slugParam = context.params.slug

    const dataDir = path.resolve(process.env.PWD, 'data/markdown/news');

    const newsFilePath = path.resolve(dataDir, slugParam + '.md');

    const newsFileContent = fs.readFileSync(newsFilePath, {encoding:'utf8'});

    const { data, content, errors } = frontmatter(newsFileContent);

    const { title, slug, date, animal, enclosure } = data;



    return {
        props: {
            title,
            slug,
            date: date.toISOString(),
            animal,
            enclosure,
            content
        }
    }
}


export async function getStaticPaths() {


    const dataDir = path.resolve(process.env.PWD, 'data/markdown/news');

    const newsPostFiles = fs.readdirSync(dataDir);

    let newsSlugs = [];

    for(const newsPostFile of newsPostFiles) {

        if ('.DS_Store' === newsPostFile) {
            continue;
        }

        const newsFilePath = path.resolve(dataDir, newsPostFile);

        if (false === fs.existsSync(newsFilePath)) {
            continue;
        }

        const newsFileContent = fs.readFileSync(newsFilePath, {encoding: 'utf8'});

        const {data} = frontmatter(newsFileContent);
        const {slug} = data;

        newsSlugs.push({
            params:{
                slug: slug + ''
            }
        });

    }

    console.log(newsSlugs)

    return {

        paths: newsSlugs,

        fallback: false,
    }
}