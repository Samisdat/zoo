import { NextApiRequest, NextApiResponse } from 'next'

import {FeatureCollection, Point, Polygon} from "geojson";
import {get} from "../../../data-repos/geojson";
import {getStrapiURL} from "../../../helper/strapi";

const emptyGeoJson:FeatureCollection = {
    "type": "FeatureCollection",
    "features": []
};

export const getFullGeoJson = async (): Promise<FeatureCollection> => {

    const geoJson = {
        ...emptyGeoJson
    };

    let facilityBoxes = await get('facility-box') as FeatureCollection<Polygon>;

    /*
    facilityBoxes.features = facilityBoxes.features.filter((feature)=>{

        return (false !== feature.properties?.published);

    });

    for(const feature of facilityBoxes.features){
        console.log(feature.properties.slug)

        const requestUrl = getStrapiURL('/facilities?slug=' + feature.properties.slug);

        const facility = fetch(requestUrl)
            .then(res => res.json())
            .then(async (json) => {
                const id = json[0].id;
                const title = json[0].title;

                const geoJson = {
                    ...feature
                };

                delete geoJson.properties;

                const zoomBox = {
                    title: title + ' Box',
                    type: 'box',
                    geojson: geoJson,
                    facility: [id]
                }

                const requestUrl = getStrapiURL('/map-elements');
                const foo = await fetch(requestUrl, {
                    method: 'post',
                    body:    JSON.stringify(zoomBox),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

            });

    }


    geoJson.features = geoJson.features.concat(facilityBoxes.features);

    */
    const facilityCircles = await get('facility-circle') as FeatureCollection<Point>;
    /*

    for(const feature of facilityCircles.features) {
        console.log(feature.properties.slug)

        const requestUrl = getStrapiURL('/facilities?_publicationState=preview&slug=' + feature.properties.slug);

        console.log(requestUrl)

        const facility = fetch(requestUrl)
            .then(res => res.json())
            .then(async (json) => {
                console.log(feature.properties.slug, json.length);

                const id = json[0].id;
                const title = json[0].title;

                const geoJson = {
                    ...feature
                };

                delete geoJson.properties;

                const circle = {
                    title: title + ' Point',
                    type: 'point',
                    geojson: geoJson,
                    facility: [id]
                };

                console.log(circle)

                const requestUrl = getStrapiURL('/map-elements');
                fetch(requestUrl, {
                    method: 'post',
                    body:    JSON.stringify(circle),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then( (json) => {

                        console.log(json);

                    })
            })

        }
    */  
    geoJson.features = geoJson.features.concat(facilityCircles.features);

    /*


const boundingBox = await get('bounding-box') as FeatureCollection<Polygon>;
geoJson.features = geoJson.features.concat(boundingBox.features);

const ways = await get('way') as FeatureCollection<Polygon>;
geoJson.features = geoJson.features.concat(ways.features);

const border = await get('border') as FeatureCollection<Polygon>;
geoJson.features = geoJson.features.concat(border.features);
*/
    return geoJson;

}

export default async (req: NextApiRequest, res: NextApiResponse<FeatureCollection>) => {

    const geoJson = await getFullGeoJson();

    res.status(200).json(geoJson);

}