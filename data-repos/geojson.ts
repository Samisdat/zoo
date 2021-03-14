import path from "path";
import fs from "fs";
import {Feature, LineString, Polygon} from "geojson";
import {getDataDir} from "./data-helper";

let allowList = [
    'bounding-box',
    'border',
    'way',
    'facility-box',
    'facility-circle'
];

export const isAllowedType = (type: string) => {

    return allowList.includes(type);

}

export const get = async (type:string):Promise<any> => {

    // why did i throw an error in a promise ?
    if(false === allowList.includes(type)){
        throw new Error('not allowed')
    }

    const geojson = JSON.parse(
        fs.readFileSync(getDataDir('geojson', type) + '/geo.json', {encoding: 'utf8'})
    );

    geojson.features = geojson.features.map( (feature:Feature<Polygon>)=>{

        if(! feature.properties){
            feature.properties = {}
        }

        feature.properties.type = type;

        return feature;

    });


    geojson.features = geojson.features.map((feature:Feature)=>{

        // for reason d3 v6 renders polygons as rectangle
        // this is the workaround

        const type = feature.geometry.type;

        if('Polygon' !== type){
            return feature;
        }

        const polygon:Feature<Polygon> = feature as Feature<Polygon>;

        const lineString: Feature<LineString> = {
            type: 'Feature',
            geometry:{
                type: 'LineString',
                coordinates: polygon.geometry.coordinates[0]
            },
            properties: polygon.properties
        };

        return lineString;

    });

    return geojson;
}
