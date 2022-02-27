import React from 'react';
import Moment from "react-moment";
import {getPostBySlug, getPosts} from "strapi-api/query/posts";
import {Post} from "strapi-api/entity/post/post";
import {Warehouse} from "strapi-api/warehouse/warehouse";
import {useRouter} from "next/router";
import {Breadcrumb, BreadcrumbLink, BreadcrumbProps} from "components/Navigation/Breadcrumb";
import Container from "@material-ui/core/Container";
import {getPhotoById, getPhotos} from "../../strapi-api/query/photos";
import {Photo} from "../../strapi-api/entity/photo/photo";
import {getImagePath} from "../../helper/getImagePath";
import {FocalPointPicker} from "../../components/FocalPoint/Picker";

const ReactMarkdown = require('react-markdown')
const gfm = require('remark-gfm')

export default function BlogPost(props) {

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { id } = router.query
    const { asPath } = router

    const photo = Warehouse.get().getPhoto(
        parseInt(id as string, 10)
    );

    console.log(photo)

    const breadcrumbProps:BreadcrumbLink[] = [
        {
            href: '/blog',
            title: 'Blog',
            icon: 'blog',
        },
        {
            href: asPath,
            title: photo.title,
        },
    ];

    return (
        <Container>
            <Breadcrumb
                links={breadcrumbProps}
            />
            <h1>{photo.title}</h1>
            <FocalPointPicker
                photo={photo}
            />
        </Container>
    );
}

export async function getStaticProps(context) {

    const slugParam = context.params.id

    await getPhotoById(slugParam);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}


export async function getStaticPaths() {

    const photos = await getPhotos();

    let ids = photos.map((photo:Photo)=>{
        return {
            params:{
                id: photo.id + ''
            }
        }
    });

    return {
        paths: ids,
        fallback: false,
    };
}