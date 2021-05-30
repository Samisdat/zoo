import React from 'react';
import { useRouter } from 'next/router'
import Typography from "@material-ui/core/Typography";
import {Feature, Polygon} from "geojson";
import {getFullGeoJson} from "../api/geojson/list";
import {MapDimension, MapFocus} from "../index";
import {getAnimalBySlug, getAnimals} from "../../strapi-api/query/animals";
import {Animal} from "../../strapi-api/entity/animal/animal";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import Container from "@material-ui/core/Container";
import {Breadcrumb, BreadcrumbLink, BreadcrumbProps} from "../../components/Navigation/Breadcrumb";
import {Distribution} from "../../components/Distribution/Distribution";
import {getMapElementById} from "../../strapi-api/query/map-elements";
import {MapRoot} from "../../components/Map/Root";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {Endanger} from "../../components/Animal/Endanger";

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query
    const { asPath } = router;

    Warehouse.get().hydrate(props.warehouse);

    const animal: Animal = Warehouse.get().getAnimals().find((animal:Animal)=>{
        return (slug === animal.slug);
    });

    const breadcrumbProps:BreadcrumbProps = {
        category: {
            href: '/tiere',
            title: 'Tiere',
            icon: 'pet',
        },
        page: {
            href: asPath,
            title: animal.title,
        },
    };

    let facility = undefined;

    /* same animals can be found in more then one enclosure. But the most common case is one */
    if(0 !== animal.facilities.length){
        facility = animal.facilities[0]
    }

    const image = animal.photos[0];

    let focus: MapElement = facility.mapElements.find((mapElement:MapElement)=>{
        return ('box' === mapElement.properties.type);
    });

    /*
    if(animal.facility){

        focus = props.geoJson.features.find((feature:Feature)=>{

            if('facility-box' !== feature.properties?.type){
                return false;
            }

            if(animal.facility !== feature.properties?.slug){
                return false;
            }

            return true;
        });

    }
    */
    const setTeaser = () => {

    };

    const mapDimension: MapDimension = {
        width: 300,
        height: 300
    };

    const mapElements = Warehouse.get().getMapElements();

    return (
        <React.Fragment>
            <Breadcrumb
                {...breadcrumbProps}
            />
            <Typography component="h1">
                {animal.title}
            </Typography>
            <Typography component="h2">
                Tiere oder Bilder
            </Typography>
            <Typography component="h2">
                Gehege
            </Typography>
            {JSON.stringify(facility)}
            <Typography component="h2">
                Tabelle
            </Typography>
            <Typography component="h2">
                Beschreibung
            </Typography>
            <Endanger
                iucnStatus={animal.iucnStatus}
            />
            <Typography component="h2">
                Verbereitung
            </Typography>
            <Distribution />
            <Typography component="h2">
                Links
            </Typography>

            {/*<Distribution/>*/}
            {/*animal.facility &&
                <MapRoot
                    focus={focus}
                    setTeaser={setTeaser}
                    mapDimension={mapDimension}
                    {...props}
                />
            */}
            <img
                src={image.medium.src}
                style={{
                    width: 300
                }}
            />

            <div>
                <a href={animal.wikipediaLink}>
                    {animal.wikipediaLink}
                </a>
            </div>
            <div>
                <a href={animal.iucnLink}>
                    {animal.iucnLink}
                </a>
            </div>
        </React.Fragment>

    );
}

export async function getStaticProps(context) {

    await getAnimalBySlug(context.params.slug);

    await getMapElementById(80);
    await getMapElementById(79);

    let getJson = await getFullGeoJson();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
            geoJson:getJson
        }
    }
}

export async function getStaticPaths() {

    let animals = await getAnimals();

    const animalPaths = animals.map((animal:Animal)=>{
        return {
            params:{
                slug: animal.slug
            }
        }
    });

    return {

        paths: animalPaths,

        fallback: false,
    }
}