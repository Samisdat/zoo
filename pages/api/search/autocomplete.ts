import { NextApiRequest, NextApiResponse } from 'next'

import {getOneGeoJson} from "../geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

export const getZoomboxes = async () => {

    const zoomBoxesGeoJson = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    const zoomBoxes = zoomBoxesGeoJson.features.map((feature:Feature<Polygon>)=>{

        return{
            type: 'zoomBox',
            feature: feature
        };

    });

    const data = zoomBoxes.sort( (a:any, b:any)=>{

        return a.feature.properties.name.localeCompare(b.feature.properties.name);

    });

    return data;
}

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const zoomBoxes = await getZoomboxes();
    res.status(200).json(zoomBoxes);

}