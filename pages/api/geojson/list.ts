import { NextApiRequest, NextApiResponse } from 'next'

import {getOneGeoJson} from "../geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

export const getEnclosureBox = async ():Promise<FeatureCollection> => {

    const enclosureBoxes = await getOneGeoJson('enclosure-boxes') as FeatureCollection<Polygon>;

    enclosureBoxes.features = enclosureBoxes.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'enclosure-box';

        return feature;

    });

    // @TODO does sorting make sense on this side?
    enclosureBoxes.features = enclosureBoxes.features.sort( (a:Feature<Polygon>, b:Feature<Polygon>)=>{
        return a.properties.name.localeCompare(b.properties.name);
    });

    return enclosureBoxes;

}

export const getBoundingBox = async ():Promise<FeatureCollection> => {

    const enclosureBoxes = await getOneGeoJson('bounding-box') as FeatureCollection<Polygon>;

    enclosureBoxes.features = enclosureBoxes.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'bounding-box';

        return feature;

    });

    return enclosureBoxes;

}

const emptyGeoJson:FeatureCollection = {
    "type": "FeatureCollection",
    "features": []
};

export const getFullGeoJson = async (): Promise<FeatureCollection> => {

    const geoJson = {
        ...emptyGeoJson
    };

    const enclosureBoxes = await getEnclosureBox();
    geoJson.features = geoJson.features.concat(enclosureBoxes.features);

    const boundingBox = await getBoundingBox();
    geoJson.features = geoJson.features.concat(boundingBox.features);

    return geoJson;

}

export default async (req: NextApiRequest, res: NextApiResponse<FeatureCollection>) => {

    const geoJson = await getFullGeoJson();

    res.status(200).json(geoJson);

}