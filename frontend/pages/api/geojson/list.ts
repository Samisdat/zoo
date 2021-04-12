import { NextApiRequest, NextApiResponse } from 'next'

import {FeatureCollection, Point, Polygon} from "geojson";
import {get} from "../../../data-repos/geojson";

const emptyGeoJson:FeatureCollection = {
    "type": "FeatureCollection",
    "features": []
};

export const getFullGeoJson = async (): Promise<FeatureCollection> => {

    const geoJson = {
        ...emptyGeoJson
    };

    let facilityBoxes = await get('facility-box') as FeatureCollection<Polygon>;

    facilityBoxes.features = facilityBoxes.features.filter((feature)=>{

        return (false !== feature.properties?.published);

    });

    geoJson.features = geoJson.features.concat(facilityBoxes.features);

    const facilityCircles = await get('facility-circle') as FeatureCollection<Point>;
    geoJson.features = geoJson.features.concat(facilityCircles.features);

    const boundingBox = await get('bounding-box') as FeatureCollection<Polygon>;
    geoJson.features = geoJson.features.concat(boundingBox.features);

    const ways = await get('way') as FeatureCollection<Polygon>;
    geoJson.features = geoJson.features.concat(ways.features);

    const border = await get('border') as FeatureCollection<Polygon>;
    geoJson.features = geoJson.features.concat(border.features);

    return geoJson;

}

export default async (req: NextApiRequest, res: NextApiResponse<FeatureCollection>) => {

    const geoJson = await getFullGeoJson();

    res.status(200).json(geoJson);

}