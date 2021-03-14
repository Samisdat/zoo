import { NextApiRequest, NextApiResponse } from 'next'

import {Feature, FeatureCollection, Point, Polygon} from "geojson";
import {get} from "../../../data-repos/geojson";

const getBorder = async ():Promise<FeatureCollection> => {

    const border = await get('border') as FeatureCollection<Polygon>;

    return border;

}

const getWays = async ():Promise<FeatureCollection> => {

    const ways = await get('way') as FeatureCollection<Polygon>;

    // @TODO does sorting make sense on this side?
    ways.features = ways.features.sort( (a:Feature<Polygon>, b:Feature<Polygon>)=>{
        return a.properties.name.localeCompare(b.properties.name);
    });

    return ways;

}

const getFacilityBoxes = async ():Promise<FeatureCollection> => {

    const facilityBoxes = await get('facility-box') as FeatureCollection<Polygon>;

    // @TODO does sorting make sense on this side?
    facilityBoxes.features = facilityBoxes.features.sort( (a:Feature<Polygon>, b:Feature<Polygon>)=>{
        return a.properties.name.localeCompare(b.properties.name);
    });

    return facilityBoxes;

}

const getFacilityCircles = async ():Promise<FeatureCollection> => {

    const facilityCircles = await get('facility-circle') as FeatureCollection<Point>;

    return facilityCircles;

}

const getBoundingBox = async ():Promise<FeatureCollection> => {

    const boundingBox = await get('bounding-box') as FeatureCollection<Polygon>;

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

    const facilityCircles = await getFacilityCircles();
    geoJson.features = geoJson.features.concat(facilityCircles.features);

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