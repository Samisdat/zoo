import React from 'react';
import Moment from 'react-moment';
import {getPostBySlug, getPosts} from 'strapi-api/query/posts';
import {Post} from 'strapi-api/entity/post/post';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {useRouter} from 'next/router';
import {Breadcrumb, BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Typography from '@mui/material/Typography';
import {FocalPointImage} from '../../components/FocalPoint/Image';
import {Large} from '../../components/viewport/Large';
import {Small} from '../../components/viewport/Small';
import {useViewport} from "../../components/viewport/useViewport";
import {Header} from "../../components/Header/Header";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

export default function BlogPost(props) {

    const {width} = useViewport();

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router

    const post = Warehouse.get().getPosts().find((post:Post)=>{
        return (slug === post.slug);
    });

    console.log(post.individualAnimals)

    const headerImg = post.photos[0];
    const headerImg2 = post.photos[1];

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
        <React.Fragment>
            <Header
                photo={headerImg}
                largeWidth={1000}
                largeHeight={300}
                smallWidth={width}
                smallHeight={200}
            />
            <Breadcrumb
                links={breadcrumbProps}
            />
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