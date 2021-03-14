import React from 'react';
import {Feature} from "geojson";
import {getFullGeoJson} from "../api/geojson/list";
import path from "path";
import fs from "fs";
const frontmatter = require('@github-docs/frontmatter')

const ReactMarkdown = require('react-markdown')

const gfm = require('remark-gfm')

export default function Gehege(props) {

    return (
        <React.Fragment>
            <h1>{props.frontmatterMd.data.title}</h1>
            <ReactMarkdown plugins={[gfm]} children={props.frontmatterMd.content} />
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const slug = context.params.slug

    const dataDir = path.resolve(process.env.PWD, 'data-repos/markdown/enclosures');

    const facilityFilePath = path.resolve(dataDir, slug + '.md');

    const facilityFileContent = fs.readFileSync(facilityFilePath, {encoding:'utf8'});

    const frontmatterMd = frontmatter(facilityFileContent);

    let getJson = await getFullGeoJson();

    const props: any = {
        geoJson: getJson,
        frontmatterMd:frontmatterMd
    };

    return {
        props: props
    }
}


export async function getStaticPaths() {

    const getJson = await getFullGeoJson();

    const facilitySlugs = getJson.features
    .filter((feature:Feature)=>{
        return ('facility-box' === feature.properties.type);
    })
    .map((feature:Feature)=>{

        return {
            params:{
                slug: feature.properties.slug
            }
        }

    });

    return {

        paths: facilitySlugs,

        fallback: false,
    }
}