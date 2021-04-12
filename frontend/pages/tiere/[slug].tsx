import React from 'react';
import { useRouter } from 'next/router'
import Typography from "@material-ui/core/Typography";
import {Distribution} from "../../components/Distribution/Distribution";
import {Feature, Polygon} from "geojson";
import {MapRoot} from "../../components/Map/Root";
import {getFullGeoJson} from "../api/geojson/list";
import {MapDimension, MapFocus} from "../index";
import {get, list} from "../../data-repos/aninals";
import {Animal} from "../../data-repos/aninals.interface";

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query

    const animal: Animal = props.animal as Animal;

    const image = props.animal.images[0];

    let focus: MapFocus | Feature<Polygon> = 'none';

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
            <Distribution/>
            {animal.facility &&
                <MapRoot
                    focus={focus}
                    setTeaser={setTeaser}
                    mapDimension={mapDimension}
                    {...props}
                />
            }
            <img
                src={image}
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

    const animal = await get(context.params.slug);

    let getJson = await getFullGeoJson();

    return {
        props: {
            animal:animal,
            geoJson:getJson
        }
    }
}

export async function getStaticPaths() {

    let animals = await list();

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