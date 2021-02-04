import { NextApiRequest, NextApiResponse } from 'next'
import {getSlug} from "helper/getSlug";
import fs from "fs";
import path from "path";
import {getAnimals} from "../../animals";
const frontmatter = require('@github-docs/frontmatter')

export interface TeaserInterface {
    href: string;
    title: string;
    subLine: string;
    image: string;
}

const dataDir = path.resolve(process.env.PWD + '/data/markdown');

export default async (req: NextApiRequest, res: NextApiResponse<TeaserInterface>) => {

    let {
        query: {type,slug},
    } = req;

    // @TODO what about type or slug is string[]

    type = type as string;
    slug = slug as string;

    const animals = await getAnimals();

    const animal = animals.find((animal)=>{
        if(slug === animal.facility){
            return true;
        }

        return false;
    });

    console.log(animal);

    const href = `/${type}/${animal.slug}`;

    let image = undefined;

    if(undefined !== animal.images && animal.images.length > 0){
        image = animal.images[0];
    }

    let scientificName = animal.scientificName;

    const teaser:TeaserInterface = {
        image: image,
        title: animal.title,
        subLine: scientificName,
        href: href,
    };

    res.status(200).json(teaser);

}