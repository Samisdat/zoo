import { NextApiRequest, NextApiResponse } from 'next'
import {getDistribution} from "../../tiere/[slug]";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    let {
        query: {slug},
    } = req;

    // @TODO what about type or slug is string[]

    slug = slug as string;

    const distribution = await getDistribution(slug)

    res.status(200).json(distribution);

}