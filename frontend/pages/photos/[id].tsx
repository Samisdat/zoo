import React, {useEffect, useState} from 'react';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {useRouter} from 'next/router';
import {Breadcrumb, BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Container from '@mui/material/Container';
import {getPhotoById, getPhotos} from '../../strapi-api/query/photos';
import {Photo} from '../../strapi-api/entity/photo/photo';
import {FocalPointPicker} from '../../components/FocalPoint/Picker';
import {FocalPointImage} from '../../components/FocalPoint/Image';
import {Position} from '../../components/Map/Context/MapContext';
import {getStrapiUrl} from '../../strapi-api/utils/get-strapi-url';

export default function PhotoPage(props) {

    Warehouse.get().hydrate(props.warehouse);

    const router = useRouter()
    const { id } = router.query
    const { asPath } = router

    const photo = Warehouse.get().getPhoto(
        parseInt(id as string, 10)
    );

    const [focal, setFocal] = useState<Position>({
        x: photo.focalPoint.x,
        y: photo.focalPoint.y
    });

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

    const saveFocal = async (focal:Position) => {

        if(
            photo.focalPoint.x === focal.x &&
            photo.focalPoint.y === focal.y
        ){
            return;
        }

        const url = getStrapiUrl(`/photos/${photo.id}`);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(focal) // body data type must match "Content-Type" header
        });

        return response.json();

    }

    useEffect(() =>{

        const response = saveFocal(focal);

    },[focal])

    return (
        <Container>
            <Breadcrumb
                links={breadcrumbProps}
            />
            <h1>{photo.title}</h1>
            <FocalPointPicker
                photo={photo}
                point={photo.focalPoint}
                change={setFocal}
            />
            <FocalPointImage
                photo={photo}
                width={400}
                height={175}
                point={focal}
            />
            <FocalPointImage
                photo={photo}
                width={200}
                height={200}
                point={focal}
            />
            <FocalPointImage
                photo={photo}
                width={200}
                height={400}
                point={focal}
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

    const ids = photos.map((photo:Photo)=>{
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