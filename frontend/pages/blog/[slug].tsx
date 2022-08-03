import React from 'react';
import Moment from 'react-moment';
import {useRouter} from 'next/router';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Typography from '@mui/material/Typography';
import {Large} from '../../components/viewport/Large';
import {Small} from '../../components/viewport/Small';
import Page from '../../components/Page/Page';
import {Warehouse} from '../../data/warehouse/warehouse';
import {Post} from '../../data/graphql/post/post';
import {fetchPostBySlug} from '../../data/graphql/posts';
import {apolloClient} from '../../data/graphql/apolloClient';
import {getPostSlugs} from '../../data/graphql/post/grahpql';
import {Contents} from "../../components/Contents/Contents";

import {Headline} from "../../components/Contents/Headline/Headline";
import {styled} from "@mui/material/styles";

export default function BlogPost(props) {

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

            <Typography variant="subtitle1" gutterBottom component="div">
                <Moment format="DD.MM.YYYY" date={post.date} />
            </Typography>

            <Typography variant="h1" component="h1" gutterBottom>
                {post.title}
            </Typography>

            <Contents
                parts={post.content}
            />

        </Page>
    );
}

export async function getStaticProps(context) {

    const slug = context.params.slug

    // console.log(slug);

    await fetchPostBySlug(slug);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}


export async function getStaticPaths() {

    const graphqlSlugs = await apolloClient.query({
        query:getPostSlugs
    });

    const paths = graphqlSlugs.data.posts.data.map((graphql:any)=>{

        return {
            params:{
                slug: graphql.attributes.slug + ''
            }
        }
    });

    // console.log(paths);

    return {
        paths,
        fallback: false,
    };
}