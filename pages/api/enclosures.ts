import { NextApiRequest, NextApiResponse } from 'next'

import {listEnclosures} from "../../data-repos/enclosures";
import {Enclosures} from "../../data-repos/enclosures.interface";
import {getStrapiURL} from "../../helper/strapi";

export default async (req: NextApiRequest, res: NextApiResponse<Enclosures[]>) => {

    const enclosures = await listEnclosures();

    /*
    for(const enclosure of enclosures){

        const requestUrl = getStrapiURL('/facilities');

        const body:any = {};

        body.slug = enclosure.slug;
        body.title = enclosure.title;
        body.body = enclosure.content;
        body.type = enclosure.type;
        body.raw_published = enclosure.published;

        await fetch(requestUrl, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        });

    }
     */

    res.status(200).json(enclosures);

}