import { NextApiRequest, NextApiResponse } from 'next'

import {Animal} from "../../data-repos/aninals.interface";
import {list} from "../../data-repos/aninals";
import {getStrapiURL} from "../../helper/strapi";

export default async (req: NextApiRequest, res: NextApiResponse<Animal[]>) => {

    const animals = await list();

    /*
    for(const animal of animals){

        const requestUrl = getStrapiURL('/animals');

        const body:any = {};

        body.slug = animal.slug;
        body.title = animal.title;
        body.wikidata = animal.wikidata;
        body.wikipediaLink = animal.wikipediaLink;
        body.scientificName = animal.scientificName;
        body.iucnID = animal.iucnID;
        body.iucnLink = animal.iucnLink;
        body.iucnStatus = animal.iucnStatus;
        body.body = animal.content;
        body.class = animal.taxonomy.class;
        body.order = animal.taxonomy.order;
        body.family = animal.taxonomy.family;
        body.species = animal.taxonomy.species;
        body.title_en = animal.i18nNames.en;
        body.title_de = animal.i18nNames.de;
        body.title_nl = animal.i18nNames.nl;
        body.raw_facility = animal.facility;
        body.raw_published = animal.published;

        await fetch(requestUrl, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        });

    }
     */

    res.status(200).json(animals);

}