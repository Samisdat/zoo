import React from 'react';
import Moment from "react-moment";
import {get, list} from "../../data-repos/post";
import {Post} from "../../data-repos/post.interface";

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

    const post = await get(slugParam);

    const { title, slug, date, animal, enclosure, content } = post;

    return {
        props: {
            title,
            slug,
            date: (date as any).toISOString(),
            animal,
            enclosure,
            content
        }
    }
}


export async function getStaticPaths() {

    const posts = await list();

    let newsSlugs = posts.map((post:Post)=>{
        return {
            params:{
                slug: post.slug + ''
            }
        }
    });

    return {
        paths: newsSlugs,
        fallback: false,
    };
}