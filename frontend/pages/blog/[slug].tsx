import React, {useEffect} from 'react';
import Moment from 'react-moment';
import {getPostBySlug, getPosts} from 'strapi-api/query/posts';
import {Post} from 'strapi-api/entity/post/post';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {useRouter} from 'next/router';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Typography from '@mui/material/Typography';
import {Large} from '../../components/viewport/Large';
import {Small} from '../../components/viewport/Small';
import Page from '../../components/Page/Page';
import {apolloClient} from "../../src/apolloClient";
import {getPostById} from "../../graphql/queries";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

export default function BlogPost(props) {

    useEffect(()=>{

        apolloClient.query({
            query:getPostById
        }).then(result => console.log(JSON.stringify(result, null, 4)));
    })

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router

    const post = Warehouse.get().getPosts().find((post:Post)=>{
        return (slug === post.slug);
    });

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/blog',
            title: 'Blog',
            icon: 'blog',
        },
        {
            href: asPath,
            title: post.title,
        },
    ];

    return (
        <Page
            headerImage={post.headerImage}
            breadcrumb={breadcrumbLinks}
        >
            <Large>
                Large
            </Large>
            <Small>
                Small
            </Small>

            <Typography variant="h1" component="h1" gutterBottom>
                h1. Heading
            </Typography>

            <Typography variant="subtitle1" gutterBottom component="div">
                <Moment format="DD.MM.YYYY" date={post.date} />
            </Typography>
            <Typography variant="h1" component="h1" gutterBottom>
                {post.title}
            </Typography>

            <ReactMarkdown plugins={[gfm]}>
                {post.body}
            </ReactMarkdown>

        </Page>
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

    const newsSlugs = posts.map((post:Post)=>{
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