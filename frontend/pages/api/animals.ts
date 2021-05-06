import { NextApiRequest, NextApiResponse } from 'next'

import {Animal} from "../../data-repos/aninals.interface";
import {list} from "../../data-repos/aninals";
import {getAnimals} from "../../strapi-api/query/animals";

export default async (req: NextApiRequest, res: NextApiResponse<Animal[]>) => {

    const animals = await getAnimals();

    /*
    for (const animalStrapi of animalsStarpi){

        const hydrate = animalStrapi.dehydrate();

        const slug = hydrate.slug;

        const animal = animals.find((animal)=>{
            return (animal.slug == slug)
        });

        if(undefined === animal){

            console.log('slug', slug, 'not found');

            continue;
        }

        if(hydrate.className === animal.taxonomy?.class){
            continue;
        }

        hydrate.className = animal.taxonomy?.class;

        const requestUrl = getStrapiUrl('/animals/' + hydrate.id);

        const update = await fetch(requestUrl, {
            method: 'PUT',
            body:    JSON.stringify(hydrate),
            headers: {
                'Content-Type': 'application/json'
            },
        });

    }

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