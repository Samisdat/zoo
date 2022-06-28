import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Breadcrumb, BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Container from '@mui/material/Container';
import {FocalPointPicker} from '../../components/FocalPoint/Picker';
import {FocalPointImage} from '../../components/FocalPoint/Image';
import {Position} from '../../components/Map/Context/MapContext';
import {Warehouse} from '../../data/warehouse/warehouse';
import {getStrapiUrl} from '../../data/utils/get-strapi-url';
import {Photo} from '../../data/graphql/photo/photo';

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
            href: '/photos',
            title: 'Photos',
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

        focal.x = Math.round(focal.x);
        focal.y = Math.round(focal.y);

        const url = getStrapiUrl(`/api/photos/${photo.id}`);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer d099dddcf1d9f7c05d45f48dbcb2576f41cea1a85de91d1607dec0bca4a80b90dd7e3a6799beefd654df34ba04832ec7eca2d0b8453badccff6bffd24a89a147572c61e419322e3a979b2ca3318484c247015c2ea66131be5ad676dfedfca287a6b8935aba1d7df74a895cfb3c7abe6208dce62fdbd32f8bdbf38ed18ad8f657',
            },
            redirect: 'follow',
            body: JSON.stringify({data:focal})
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

    //await getPhotoById(slugParam);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}


export async function getStaticPaths() {

    //const photos = await getPhotos();

    const photos:Photo[] = [];

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