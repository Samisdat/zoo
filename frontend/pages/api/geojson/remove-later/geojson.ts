import { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import fs from 'fs';

import urlSlug from 'url-slug'

const allowList = [
    'aussengrenze',
    'wege'
];

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const dataDir = path.resolve(process.env.PWD + '/pages/api/data');

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.json', '');
    });

    slugs = slugs.reverse();

    slugs = slugs.filter((slug)=>{
        return (allowList.includes(slug));
    });

    let features = slugs.map((slug) => {

        const geojson = JSON.parse(fs.readFileSync(dataDir + '/' + slug + '/geo.json', {encoding: 'utf8'}));

        return geojson.features[0];
    })

    features = features.sort((a, b) =>{

        if(a.properties.zIndex > b.properties.zIndex){
            return 1;
        }

        if(a.properties.zIndex < b.properties.zIndex){
            return -1;
        }

        return 0;

    });

    const geojson = {
        "type": "FeatureCollection",
        features: features
    };

    res.status(200).json(geojson);

}