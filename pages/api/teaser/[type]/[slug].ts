import { NextApiRequest, NextApiResponse } from 'next'
import {getSlug} from "helper/getSlug";
import fs from "fs";
import path from "path";
import {getAnimals, getAnimal} from "../../animals";
import {getFacilities} from "../../facilities";
const frontmatter = require('@github-docs/frontmatter')

export interface TeaserInterface {
    href: string;
    title: string;
    image: string;
}

const dataDir = path.resolve(process.env.PWD + '/data/markdown');

export default async (req: NextApiRequest, res: NextApiResponse<TeaserInterface[]>) => {

    let {
        query: {type,slug},
    } = req;

    // @TODO what about type or slug is string[]

    type = type as string;
    slug = slug as string;

    const teasers :TeaserInterface[] = [];

    console.log(type, slug)

    if('animal' === type){

        const animals = await getAnimals();

        console.log(animals);

        const animal = animals.find((animal)=>{
            if(slug === animal.facility){
                return true;
            }

            return false;
        });

        const href = `/tiere/${animal.slug}`;

        let image = undefined;

        if(undefined !== animal.images && animal.images.length > 0){
            image = animal.images[0];
        }

        const teaser:TeaserInterface = {
            image: image,
            title: animal.title,
            href: href,
        };

        teasers.push(teaser);

    }
    else if('facility' === type){

        const facilities = await getFacilities();


        const facility = facilities.find((facility)=>{
            if(slug === facility.slug){
                return true;
            }

            return false;
        });

        if('food' === facility.type){

            const href = `/anlagen/${facility.slug}`;

            const teaser:TeaserInterface = {
                image: facility.images[0],
                title: facility.title,
                href: href,
            };

            teasers.push(teaser);

        }
        else if(
            'single-enclosure' === facility.type ||
            'shared-enclosure' === facility.type
        ){

        for(let i = 0, x = facility.animals.length; i < x; i += 1){

            const animalSlug = facility.animals[i];

            const animal = await getAnimal(animalSlug);

            const href = `/tiere/${animal.slug}`;

            let image = undefined;

            if(undefined !== animal.images && animal.images.length > 0){
                image = animal.images[0];
            }

            const teaser:TeaserInterface = {
                image: image,
                title: animal.title,
                href: href,
            };

            teasers.push(teaser);

        }
        }

    }

    res.status(200).json(teasers);

}