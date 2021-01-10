import { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";

export type Taxonomy = {
    class: string,
    order: string,
    family: string,
    species: string,
};

export type Animal = {
    slug: string,
    name: string,
    images: string[]
    taxonomy: Animal,

}

const dataDir = path.resolve(process.env.PWD, 'data/species');

export const getAnimal = async (slug:string):Promise<Animal> => {

    const filePath = path.resolve(dataDir, slug + '.json');

    const fileContent = await fs.readFileSync(filePath, {encoding:'utf8'});
    const fileJson = JSON.parse(fileContent);

    // @TODO validate

    return fileJson;
}


export const getAnimals = async ():Promise<Animal[]> => {

    const animals:Animal[] = [];

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.json', '');
    });

    for(const slug of slugs){

        const animal = await getAnimal(slug);

        animals.push(animal);
    }

    return animals;
}

export default async (req: NextApiRequest, res: NextApiResponse<Animal[]>) => {

    const animals = await getAnimals();

    res.status(200).json(animals);

}