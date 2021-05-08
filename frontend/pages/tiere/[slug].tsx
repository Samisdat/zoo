import React from 'react';
import { useRouter } from 'next/router'
import Typography from "@material-ui/core/Typography";
import {Feature, Polygon} from "geojson";
import {getFullGeoJson} from "../api/geojson/list";
import {MapDimension, MapFocus} from "../index";
import {getAnimalBySlug, getAnimals} from "../../strapi-api/query/animals";
import {Animal} from "../../strapi-api/entity/animal/animal";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";

export default function Tiere(props) {

    console.log(props.warehouse)

    const router = useRouter()
    const { slug } = router.query

    Warehouse.get().hydrate(props.warehouse);

    const animal: Animal = Warehouse.get().getAnimals().find((animal:Animal)=>{
        return (slug === animal.slug);
    });

    console.log(animal)

    const image = animal.photos[0];

    let focus: MapFocus | Feature<Polygon> = 'none';

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


    return (
        <React.Fragment>
            <Typography component="h1">
                {animal.title}
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