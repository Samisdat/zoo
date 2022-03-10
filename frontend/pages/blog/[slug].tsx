import React from 'react';
import Moment from 'react-moment';
import {getPostBySlug, getPosts} from 'strapi-api/query/posts';
import {Post} from 'strapi-api/entity/post/post';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {useRouter} from 'next/router';
import {Breadcrumb, BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Container from '@mui/material/Container';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

export default function BlogPost(props) {

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router

    const post = Warehouse.get().getPosts().find((post:Post)=>{
        return (slug === post.slug);
    });

    const breadcrumbProps:BreadcrumbLink[] = [
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
        <Container>
            <Breadcrumb
                links={breadcrumbProps}
            />
            <h1>{post.title}</h1>
            <h2><Moment format="DD.MM.YYYY" date={post.date} /></h2>
            <ReactMarkdown plugins={[gfm]}>
                {post.body}
            </ReactMarkdown>
        </Container>
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