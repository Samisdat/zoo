import React from 'react';
import {getFullGeoJson} from '../api/geojson/list';
import {useRouter} from 'next/router';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Page from '../../components/Page/Page';
import {Warehouse} from "../../data/warehouse/warehouse";
import {Facility} from "../../data/graphql/facility/facility";
import {Photo} from "../../data/graphql/photo/photo";
import {fetchFacilityBySlug} from "../../data/graphql/facilities";
import {apolloClient} from "../../data/graphql/apolloClient";
import {getFacilitySlugs} from "../../data/graphql/facility/grahpql";

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

    let headerImage:Photo = facility.headerImage;

    if(!headerImage){

        const animalWithImage = facility.animals.find((animal)=>{

            return (animal.headerImage);

        });

        if(undefined !== animalWithImage){

            if(animalWithImage.headerImage && animalWithImage.headerImage.thumbnail){

                headerImage = animalWithImage.headerImage;

            }

        }

    }

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
            headerImage={headerImage}
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