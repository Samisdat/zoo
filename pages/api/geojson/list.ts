import { NextApiRequest, NextApiResponse } from 'next'

import {getOneGeoJson} from "../geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

const getBorder = async ():Promise<FeatureCollection> => {

    const border = await getOneGeoJson('border') as FeatureCollection<Polygon>;

    border.features = border.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'border';

        return feature;

    });

    return border;

}

const getWays = async ():Promise<FeatureCollection> => {

    const ways = await getOneGeoJson('ways') as FeatureCollection<Polygon>;

    ways.features = ways.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'way';

        return feature;

    });

    // @TODO does sorting make sense on this side?
    ways.features = ways.features.sort( (a:Feature<Polygon>, b:Feature<Polygon>)=>{
        return a.properties.name.localeCompare(b.properties.name);
    });

    return ways;

}

const getFacilityBoxes = async ():Promise<FeatureCollection> => {

    const facilityBoxes = await getOneGeoJson('facility-boxes') as FeatureCollection<Polygon>;

    facilityBoxes.features = facilityBoxes.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'facility-box';

        return feature;

    });

    // @TODO does sorting make sense on this side?
    facilityBoxes.features = facilityBoxes.features.sort( (a:Feature<Polygon>, b:Feature<Polygon>)=>{
        return a.properties.name.localeCompare(b.properties.name);
    });

    return facilityBoxes;

}

const getBoundingBox = async ():Promise<FeatureCollection> => {

    const boundingBox = await getOneGeoJson('bounding-box') as FeatureCollection<Polygon>;

    boundingBox.features = boundingBox.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'bounding-box';

        return feature;

    });

    return boundingBox;

}

const emptyGeoJson:FeatureCollection = {
    "type": "FeatureCollection",
    "features": []
};

export const getFullGeoJson = async (): Promise<FeatureCollection> => {

    const geoJson = {
        ...emptyGeoJson
    };

    const facilityBoxes = await getFacilityBoxes();
    geoJson.features = geoJson.features.concat(facilityBoxes.features);

    const boundingBox = await getBoundingBox();
    geoJson.features = geoJson.features.concat(boundingBox.features);

    const ways = await getWays();
    geoJson.features = geoJson.features.concat(ways.features);

    const border = await getBorder();
    geoJson.features = geoJson.features.concat(border.features);

    return geoJson;

}

export default async (req: NextApiRequest, res: NextApiResponse<FeatureCollection>) => {

    const geoJson = await getFullGeoJson();

    res.status(200).json(geoJson);

}