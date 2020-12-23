import { NextApiRequest, NextApiResponse } from 'next'

import {getOneGeoJson} from "../geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

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

    res.status(200).json(data);

}