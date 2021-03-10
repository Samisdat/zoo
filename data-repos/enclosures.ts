import path from "path";
import fs from "fs";
const frontmatter = require('@github-docs/frontmatter')

import {Enclosures} from "./enclosures.interface";

const dataDir = path.resolve(process.env.PWD as string, 'data-repos/markdown/enclosures');

export const getDataDir = ():string =>{
    return dataDir;
};

export const get = async (slug:string):Promise<Enclosures> => {

    const filePath = path.resolve(getDataDir(), slug + '.md');

    const fileContent = await fs.readFileSync(filePath, {encoding:'utf8'});
    const enclosureMarkdown = frontmatter(fileContent);

    const enclosure: Enclosures = {
        slug: enclosureMarkdown.data.slug,
        title: enclosureMarkdown.data.title,
        type: enclosureMarkdown.data.type,
        animals: enclosureMarkdown.data.animals,
        content: enclosureMarkdown.content,
    };

    if(undefined === enclosure.animals){
        enclosure.animals = null;
    }

    return enclosure;
};

export const list = async ():Promise<Enclosures[]> => {

    const animals:Enclosures[] = [];

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.md', '');
    });

    for(const slug of slugs){

        const animal = await get(slug);

        animals.push(animal);

    }

    return animals;

};
