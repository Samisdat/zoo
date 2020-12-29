import { NextApiRequest, NextApiResponse } from 'next'

import {getOneGeoJson} from "../geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

export const getZoomboxes = async ():Promise<FeatureCollection> => {

    const zoomBoxes = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    zoomBoxes.features = zoomBoxes.features.map( (feature:Feature<Polygon>)=>{

        feature.properties.type = 'enclosure-box'

        return feature;

    });

    // @TODO does sorting make sense on this side?
    zoomBoxes.features = zoomBoxes.features.sort( (a:Feature<Polygon>, b:Feature<Polygon>)=>{
        return a.properties.name.localeCompare(b.properties.name);
    });

    return zoomBoxes;

}

const emptyGeoJson:FeatureCollection = {
    "type": "FeatureCollection",
    "features": []
};

export const getFeaturesList = async (): Promise<FeatureCollection> => {

    const geoJson = {
        ...emptyGeoJson
    }

    const zoomBoxes = await getZoomboxes();

    geoJson.features = geoJson.features.concat(zoomBoxes.features);

    return geoJson;

}

export default async (req: NextApiRequest, res: NextApiResponse<FeatureCollection>) => {

    const geoJson = await getFeaturesList();
    
    res.status(200).json(geoJson);

}