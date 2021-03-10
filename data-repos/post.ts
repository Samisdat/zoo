import path from "path";
import fs from "fs";
const frontmatter = require('@github-docs/frontmatter')

import {Post} from "./post.interface";

const dataDir = path.resolve(process.env.PWD as string, 'data-repos/markdown/posts');

export const getDataDir = ():string =>{
    return dataDir;
};

export const get = async (slug:string):Promise<Post> => {

    const filePath = path.resolve(getDataDir(), slug + '.md');

    const fileContent = await fs.readFileSync(filePath, {encoding:'utf8'});
    const newsMarkdown = frontmatter(fileContent);

    const post: Post = {
        slug: newsMarkdown.data.slug,
        title: newsMarkdown.data.title,
        animal: newsMarkdown.data.animal,
        content: newsMarkdown.content,
        date: newsMarkdown.data.date,
        enclosure: newsMarkdown.data.enclosure,
        published: newsMarkdown.data.published,
    };

    return post;
};

export const list = async ():Promise<Post[]> => {

    const posts:Post[] = [];

    let slugs = await fs.readdirSync(dataDir).map((file) => {
        return file.replace('.md', '');
    });

    slugs = slugs.filter((slug)=>{

        if('.DS_Store' === slug){
            return false;
        }

        return true;

    });

    for(const slug of slugs){

        const post = await get(slug);

        posts.push(post);

    }

    return posts;

};
