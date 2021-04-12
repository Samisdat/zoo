import path from "path";
import fs from "fs";
const frontmatter = require('@github-docs/frontmatter')

import {Post} from "./post.interface";
import {getDataDir, getFileNames} from "./data-helper";
import {Animal} from "./aninals.interface";

export const get = async (slug:string):Promise<Post> => {

    const filePath = path.resolve(
        getDataDir('markdown','posts'),
        slug + '.md'
    );

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

    const fileNames = await getFileNames('markdown','posts')

    const slugs = fileNames.map((fileName)=>{
        return fileName.replace('.md', '')
    });

    for(const slug of slugs){

        const post = await get(slug);

        if(true === post.published){
            posts.push(post);
        }

    }

    return posts;

};
