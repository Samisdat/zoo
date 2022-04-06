import React from 'react';
import {getFullGeoJson} from '../api/geojson/list';
import {getFacilities, getFacilityBySlug} from 'strapi-api/query/facilities';
import {Facility} from 'strapi-api/entity/facility/facility';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {useRouter} from 'next/router';
import {Breadcrumb, BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import {Header} from "../../components/Header/Header";
import {useViewport} from "../../components/viewport/useViewport";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

export default function Gehege(props) {

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router;

    const {width} = useViewport();

    Warehouse.get().hydrate(props.warehouse);

    const facility: Facility = Warehouse.get().getFacilities().find((facility:Facility)=>{
        return (slug === facility.slug);
    });

    console.log(facility.headerImage)

    const breadcrumbProps:BreadcrumbLink[] = [
        {
            href: '/anlagen',
            title: 'Anlagen',
            icon: 'building',
        },
        {
            href: asPath,
            title: facility.title,
        },
    ];


    return (
        <React.Fragment>
            <Header
                photo={facility.headerImage}
                largeWidth={1000}
                largeHeight={300}
                smallWidth={width}
                smallHeight={200}
            />
            <Breadcrumb
                links={breadcrumbProps}
            />
            <h1>{facility.title}</h1>
            <ReactMarkdown plugins={[gfm]}>
                {facility.body}
            </ReactMarkdown>
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const slug = context.params.slug

    await getFacilityBySlug(slug);

    const getJson = await getFullGeoJson();

    const props: any = {
        geoJson: getJson,
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: props
    }
}


export async function getStaticPaths() {

    const facilities = await getFacilities();

    const facilityPaths = facilities.map((facility:Facility)=>{
        return {
            params:{
                slug: facility.slug
            }
        }
    });


    return {

        paths: facilityPaths,
        fallback: false,
    }
}