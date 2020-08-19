import { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import fs from 'fs';

import urlSlug from 'url-slug'

const allowList = [
    'aussengrenze'
];

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const dataDir = path.resolve(process.env.PWD + '/pages/api/data');

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.json', '');
    });

    slugs = slugs.filter((slug)=>{
        return (allowList.includes(slug));
    });

    const features = slugs.map((slug) => {

        const geojson = JSON.parse(fs.readFileSync(dataDir + '/' + slug + '/geo.json', {encoding: 'utf8'}));

        return geojson.features;
    })

    const geojson = {
        "type": "FeatureCollection",
        features: features[0]
    };

    res.status(200).json(geojson);

}