import { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import fs from 'fs';

import urlSlug from 'url-slug'
import {FeatureCollection, Polygon} from "geojson";

let allowList = [
    'bounding-box',
    'aussengrenze',
    'way-simple',
    'zoomboxes',
];

export const getOneGeoJson = async (slug:string):any => {

    if(false === allowList.includes(slug)){
        throw new Error('not allowed')
    }

    const dataDir = path.resolve(process.env.PWD + '/pages/api/data');

    const geojson = JSON.parse(fs.readFileSync(dataDir + '/'    + slug + '/geo.json', {encoding: 'utf8'}));

    return geojson;
}

export const getGeoJson = async () => {

    const dataDir = path.resolve(process.env.PWD + '/pages/api/data');

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.json', '');
    });

    slugs = slugs.filter((slug)=>{
        return (allowList.includes(slug));
    });

    let features = [];

    slugs.forEach((slug)=>{

        const geojson = JSON.parse(fs.readFileSync(dataDir + '/' + slug + '/geo.json', {encoding: 'utf8'}));
        geojson.features.forEach((feature)=>{
            features.push(feature);
        });

    });

    features = features.sort((a, b) =>{

        if(a.properties.zIndex > b.properties.zIndex){
            return 1;
        }

        if(a.properties.zIndex < b.properties.zIndex){
            return -1;
        }

        return 0;

    });

    return {
        "type": "FeatureCollection",
        features: features
    };

}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const geojson = await getGeoJson();

    res.status(200).json(geojson);

}