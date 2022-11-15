import React from 'react';
import Moment from 'react-moment';
import {useRouter} from 'next/router';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page/Page';
import {Warehouse, WarehouseSpore} from '../../data/warehouse/warehouse';
import {Post} from '../../data/graphql/post/post';
import {fetchPostBySlug} from '../../data/graphql/posts';
import {apolloClient} from '../../data/graphql/apolloClient';
import {getPostSlugs} from '../../data/graphql/post/grahpql';
import {Contents} from "../../components/Contents/Contents";

import {Headline} from "../../components/Contents/Headline/Headline";

interface BlogPostProps{
    warehouse: WarehouseSpore
}

const getBreadcrumbLinks = (currentPath: string, post: Post | undefined): BreadcrumbLink[]=>{

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/blog',
            title: 'Blog',
            icon: 'blog',
        }
    ];

    if(post){
        breadcrumbLinks.push(
            {
                href: currentPath,
                title: post.title,
            }
        );
    }

    return breadcrumbLinks;

}

export default function BlogPost(props:BlogPostProps) {

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router

    const post = Warehouse.get().getPosts().find((post:Post)=>{
        return (slug === post.slug);
    });

    if(!post){
        return (
            <>404</>
        );
    }

    const breadcrumbLinks:BreadcrumbLink[] = getBreadcrumbLinks(asPath, post);

    return (
        <Page
            headerImage={post.headerImage}
            breadcrumb={breadcrumbLinks}
        >

            <Typography variant="subtitle1" gutterBottom component="div">
                <Moment format="DD.MM.YYYY" date={post.date} />
            </Typography>

            <Headline
                type={'headline'}
                headline={post.title}
                level={'h1'}
            />

            <Contents
                parts={post.content}
            />

        </Page>
    );
}

export async function getStaticProps(context) {

    const slug = context.params.slug

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

    return {
        paths,
        fallback: false,
    };
}