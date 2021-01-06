import { NextApiRequest, NextApiResponse } from 'next'
import {getSlug} from "helper/getSlug";
import fs from "fs";
import path from "path";

export interface TeaserInterface {
    href: string;
    title: string;
    subLine: string;
    image: string;
}


export default async (req: NextApiRequest, res: NextApiResponse<TeaserInterface>) => {

    let {
        query: {type,slug},
    } = req;

    const teaser:TeaserInterface = {
        image: "/images/elefant.jpg",
        title: "Live From Space",
        subLine: 'Mac Miller',
        href: '/foo/bar',
    };

    res.status(200).json(teaser);

}