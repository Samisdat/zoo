import React from 'react';
import {Feature} from "geojson";
import {getFullGeoJson} from "../api/geojson/list";
import path from "path";
import fs from "fs";
import {getFacilities, getFacilityBySlug} from "../../strapi-api/query/facilities";
import {Animal} from "../../strapi-api/entity/animal/animal";
import {Facility} from "../../strapi-api/entity/facility/facility";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {useRouter} from "next/router";
import {Breadcrumb, BreadcrumbProps} from "../../components/Navigation/Breadcrumb";
import Container from "@material-ui/core/Container";
const frontmatter = require('@github-docs/frontmatter')

const ReactMarkdown = require('react-markdown')

const gfm = require('remark-gfm')

export default function Gehege(props) {

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router;

    Warehouse.get().hydrate(props.warehouse);

    const facility: Facility = Warehouse.get().getFacilities().find((facility:Facility)=>{
        return (slug === facility.slug);
    });

    const breadcrumbProps:BreadcrumbProps = {
        category: {
            href: '/anlagen',
            title: 'Anlagen',
            icon: 'building',
        },
        page: {
            href: asPath,
            title: facility.title,
        },
    };


    return (
        <React.Fragment>
            <Breadcrumb
                {...breadcrumbProps}
            />
            <h1>{facility.title}</h1>
            <ReactMarkdown plugins={[gfm]} children={facility.body} />
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const slug = context.params.slug

    await getFacilityBySlug(slug);

    let getJson = await getFullGeoJson();

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