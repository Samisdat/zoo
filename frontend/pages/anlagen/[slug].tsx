import React from 'react';
import {getFullGeoJson} from '../api/geojson/list';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {useRouter} from 'next/router';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Page from '../../components/Page/Page';
import {apolloClient} from "../../graphql/apolloClient";

import {getFacilityBySlug, getFacilitySlugs} from "../../graphql/facility/grahpql";
import {Facility} from "../../graphql/facility/facility";
import {fetchPostBySlug} from "../../graphql/posts";
import {fetchFacilityBySlug} from "../../graphql/facilities";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

export default function Gehege(props) {

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router;

    Warehouse.get().hydrate(props.warehouse);

    const facility: Facility = Warehouse.get().getFacilities().find((facility:Facility)=>{
        return (slug === facility.slug);
    });

    console.log(facility);
    console.log(Warehouse.get().getPhotos());

    const breadcrumbLinks:BreadcrumbLink[] = [
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
        <Page
            headerImage={facility.headerImage}
            breadcrumb={breadcrumbLinks}
        >
            <h1>{facility.title}</h1>
            <ReactMarkdown plugins={[gfm]}>
                {facility.body}
            </ReactMarkdown>
        </Page>
    );
}

export async function getStaticProps(context) {

    const slug = context.params.slug

    await fetchFacilityBySlug(slug);

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

    const graphqlSlugs = await apolloClient.query({
        query: getFacilitySlugs
    });

    const paths = graphqlSlugs.data.facilities.data.map((graphql:any)=>{

        return {
            params:{
                slug: graphql.attributes.slug + ''
            }
        }
    });

    return {
        paths,
        fallback: false,
    }
}