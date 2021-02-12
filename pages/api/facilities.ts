import { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";
const frontmatter = require('@github-docs/frontmatter')

export interface Facility {
    slug: string;
    title:string;
    type: string
    animals:string[];
}

const dataDir = path.resolve(process.env.PWD, 'data/markdown/facility');

export const getFacility = async (slug:string):Promise<Facility> => {

    const filePath = path.resolve(dataDir, slug + '.md');

    const fileContent = await fs.readFileSync(filePath, {encoding:'utf8'});
    const facilityMarkdown = frontmatter(fileContent);

    const facility: Facility = {
        slug: facilityMarkdown.data.slug,
        title: facilityMarkdown.data.title,
        type: facilityMarkdown.data.type,
        animals: facilityMarkdown.data.animals,
    };

    if(undefined === facility.animals){
        facility.animals = null;
    }

    return facility;
}


export const getFacilities  = async ():Promise<Facility[]> => {

    const facilities:Facility[] = [];

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.md', '');
    });

    for(const slug of slugs){

        const animal = await getFacility(slug);

        facilities.push(animal);
    }

    return facilities;
}

export default async (req: NextApiRequest, res: NextApiResponse<Facility[]>) => {

    const facilities = await getFacilities();

    res.status(200).json(facilities);

}