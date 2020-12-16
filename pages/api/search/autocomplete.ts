import { NextApiRequest, NextApiResponse } from 'next'

import {getOneGeoJson} from "../geojson/geojson";
import {Feature, FeatureCollection, Polygon} from "geojson";

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const zoomBoxesGeoJson = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    const zoomBoxes = zoomBoxesGeoJson.features.map((feature:Feature<Polygon>)=>{

        return{
            type: 'zoomBox',
            name: feature.properties.name
        };

    });

    const data = zoomBoxes.sort( (a:any, b:any)=>{

        return a.name.localeCompare(b.name);

    });

    res.status(200).json(data);

}