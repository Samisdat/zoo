import path from "path";
import fs from "fs";
const frontmatter = require('@github-docs/frontmatter')

import {Animal} from "./aninals.interface";
import {getDataDir} from "./data-helper";

export const get = async (slug:string):Promise<Animal> => {

    const filePath = path.resolve(
        getDataDir('animals'),
        slug + '.md'
    );

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
        facility: animalMarkdown.data.facility,
        published: animalMarkdown.data.published,
    };

    if(undefined === animal.facility){
        animal.facility = null;
    }

    return animal;
};

export const list = async ():Promise<Animal[]> => {

    const animals:Animal[] = [];

    let slugs = await fs.readdirSync(getDataDir('animals')).map((file) => {
        return file.replace('.md', '');
    });

    for(const slug of slugs){

        const animal = await get(slug);

        animals.push(animal);

    }

    return animals;

};
