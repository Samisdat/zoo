import { NextApiRequest, NextApiResponse } from 'next'

import {getAnimals} from "strapi-api/query/animals";
import {Animal} from "strapi-api/entity/animal/animal";
import {getStrapiUrl} from "strapi-api/utils/get-strapi-url";

const stati = {
    'Q219127': 'CR',
    'Q11394': 'EN',
    'Q211005': 'LC',
    'Q278113': 'VU',
    'Q239509': 'EW',
    'Q237350': 'EX',
    'Q719675': 'NT',
    'Q3245245':'DD',
    /*'NE'*/

}

export default async (req: NextApiRequest, res: NextApiResponse<Animal[]>) => {

    const animals = await getAnimals();

    /*
    for (const animal of animals){

        if(null === animal.iucnStatus){
            continue
        }

        const status = stati[animal.iucnStatus];

        const hydrate = animal.dehydrate();

        hydrate.iucnStatus = status;
        console.log(animal.iucnStatus, hydrate)

        const requestUrl = getStrapiUrl('/animals/' + hydrate.id);

        await fetch(requestUrl, {
            method: 'PUT',
            body:    JSON.stringify(hydrate),
            headers: {
                'Content-Type': 'application/json'
            },
        });


    }
    */
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