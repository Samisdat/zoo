import path from "path";
import fs from "fs";
const frontmatter = require('@github-docs/frontmatter')

import {Enclosures} from "./enclosures.interface";
import {getDataDir, getFileNames} from "./data-helper";

export const get = async (slug:string):Promise<Enclosures> => {

    const filePath = path.resolve(
        getDataDir('markdown', 'enclosures'),
        slug + '.md'
    );

    const fileContent = await fs.readFileSync(filePath, {encoding:'utf8'});
    const enclosureMarkdown = frontmatter(fileContent);

    const enclosure: Enclosures = {
        slug: enclosureMarkdown.data.slug,
        title: enclosureMarkdown.data.title,
        type: enclosureMarkdown.data.type,
        animals: enclosureMarkdown.data.animals,
        content: enclosureMarkdown.content,
        published: enclosureMarkdown.data.published,
    };

    if(undefined === enclosure.animals){
        enclosure.animals = null;
    }

    return enclosure;
};

export const list = async ():Promise<Enclosures[]> => {

    const enclosures:Enclosures[] = [];

    const fileNames = await getFileNames('markdown','enclosures')

    const slugs = fileNames.map((fileName)=>{
        return fileName.replace('.md', '')
    });

    for(const slug of slugs){

        const enclosure = await get(slug);

        if(true === enclosure.published){
            enclosures.push(enclosure);
        }

    }

    return enclosures;

};
