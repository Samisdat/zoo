import { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";
const frontmatter = require('@github-docs/frontmatter')

export interface Taxonomy {
    class: string;
    order: string;
    family: string;
    species: string;
};

export interface i18nAnimal{
    en: string;
    de: string;
    nl: string;
}

export interface Animal {
    slug: string;
    title:string;
    taxonomy: Taxonomy
    wikidata:string;
    wikipediaLink: string;
    images:  string[];
    scientificName: string;
    i18nNames: i18nAnimal,
    iucnID: string;
    iucnLink: string;
    iucnStatus: string;
    content: string;
}

const dataDir = path.resolve(process.env.PWD, 'data/markdown/animals');

export const getAnimal = async (slug:string):Promise<Animal> => {

    const filePath = path.resolve(dataDir, slug + '.md');

    const fileContent = await fs.readFileSync(filePath, {encoding:'utf8'});
    const animalMarkdown = frontmatter(fileContent);

    const animal: Animal = {
        slug: animalMarkdown.data.slug,
        title: animalMarkdown.data.title,
        taxonomy: {
            class: animalMarkdown.data.class,
            order: animalMarkdown.data.order,
            family: animalMarkdown.data.family,
            species: animalMarkdown.data.species,
        },
        wikidata: animalMarkdown.data.wikidata,
        wikipediaLink: animalMarkdown.data.wikipediaLink,
        images: animalMarkdown.data.images,
        scientificName: animalMarkdown.data.scientificName,
        i18nNames: animalMarkdown.data.i18nNames,
        iucnID: animalMarkdown.data.iucnID,
        iucnLink: animalMarkdown.data.iucnLink,
        iucnStatus: animalMarkdown.data.iucnStatus,
        content: animalMarkdown.content,
    };

    return animal;
}


export const getAnimals = async ():Promise<Animal[]> => {

    const animals:Animal[] = [];

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.md', '');
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