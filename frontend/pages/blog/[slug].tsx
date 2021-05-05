import React from 'react';
import Moment from "react-moment";
import {get, list} from "../../data-repos/post";
import {getPostBySlug, getPosts} from "../../strapi-api/query/posts";
import {Post} from "../../strapi-api/entity/post/post";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {useRouter} from "next/router";

const ReactMarkdown = require('react-markdown')
const gfm = require('remark-gfm')

export default function BlogPost(props) {

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { slug } = router.query

    const post = Warehouse.get().getPosts().find((post:Post)=>{
        return (slug === post.slug);
    });

    return (
        <React.Fragment>
            <h1>{post.title}</h1>
            <h2><Moment format="DD.MM.YYYY" date={post.date} /></h2>
            <ReactMarkdown plugins={[gfm]} children={post.body} />
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const slugParam = context.params.slug

    await getPostBySlug(slugParam);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}


export async function getStaticPaths() {

    const posts = await getPosts();

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