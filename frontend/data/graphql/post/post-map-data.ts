import {PostJson} from "./post-json";
import {Entity} from "../../strapi-api/entity/entity";
import {Animal} from "../animal/animal";
import {Post} from "./post";
import {photoMapData} from "../photo/photo-map-data";

export const postMapData = (apiData: any):Entity<any>[] =>{

    const entities:Entity<any>[] = [];

    const id = parseInt(apiData.id, 10);
    const animals:number[] = [];
    const facilities:number[] = [];
    const individual_animals:number[] = [];

    if(!apiData.attributes?.slug){
        throw new Error('slug is mandatory for post');
    }

    const slug = apiData.attributes.slug

    if(!apiData.attributes?.title){
        throw new Error('title is mandatory for post');
    }

    const title = apiData.attributes.title

    if(!apiData.attributes?.date){
        throw new Error('date is mandatory for post');
    }

    const date = apiData.attributes.date

    if(!apiData.attributes?.body){
        throw new Error('body is mandatory for post');
    }

    const body = apiData.attributes.body

    let headerImage:number | null = null;
    if (apiData.attributes.headerImg?.image?.data) {

        const photo = photoMapData(apiData.attributes.headerImg?.image?.data);

        entities.push(photo);

        headerImage = photo.id;

    }

    const postJson: PostJson = {
        id,
        slug,
        title,
        date,
        body,
        animals,
        facilities,
        individual_animals,
        headerImage
    };


    const post = Post.hydrate(postJson);

    entities.push(post);


    return entities;

}
