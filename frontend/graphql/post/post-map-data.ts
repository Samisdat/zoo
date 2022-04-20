import {PostJson} from "./post-json";

export const postMapData = (apiData: any):PostJson =>{

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

    const postJson: PostJson = {
        id,
        slug,
        title,
        date,
        body,
        animals,
        facilities,
        individual_animals,
    };

    if(apiData.attributes?.headerImg?.image?.data?.id){
        postJson.headerImage = parseInt(
            apiData.attributes?.headerImg?.image?.data?.id, 10
        );
    }

    return postJson;

}
