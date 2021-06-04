import { NextApiRequest, NextApiResponse } from 'next'
import path from "path";
import {FeatureCollection} from "geojson";
import fs from "fs";

const distributionDataDir = path.resolve(process.env.PWD, 'data-repos/iucnredlist');

const getDistribution = async (slug:string): Promise<FeatureCollection> => {

    const distributionDataPath = path.resolve(
        distributionDataDir,
        slug + '.topo.json'
    );

    if (false === fs.existsSync(distributionDataPath)) {

        return null;

    }

    const distributionData = fs.readFileSync(distributionDataPath, {encoding:'utf8'});

    return JSON.parse(distributionData);

}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    let {
        query: {slug},
    } = req;

    // @TODO what about type or slug is string[]

    slug = slug as string;

    const distribution = await getDistribution(slug)

    res.status(200).json(distribution);

}