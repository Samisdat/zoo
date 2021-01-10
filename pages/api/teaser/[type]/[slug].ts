import { NextApiRequest, NextApiResponse } from 'next'
import {getSlug} from "helper/getSlug";
import fs from "fs";
import path from "path";
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

    const schema = {
        properties: {
            title: {
                type: 'string',
                required: true
            },
            latin: {
                type: 'string',
                required: true
            },
            image: {
                type: 'string',
                required: true
            },
            wikipedia: {
                type: 'string',
                format: 'url',
                required: true
            }
        }
    }

    const filePath = path.resolve(dataDir, type, slug + '.md')

    const fileContent = fs.readFileSync(filePath, {encoding:'utf8'});

    const { data, content, errors } = frontmatter(fileContent,{
        schema
    });

    const href = `/${type}/${slug}`;

    const teaser:TeaserInterface = {
        image: data.image,
        title: data.title,
        subLine: data.latin,
        href: href,
    };

    res.status(200).json(teaser);

}