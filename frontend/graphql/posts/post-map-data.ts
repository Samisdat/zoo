import {PostJson} from "./post-json";

export const postMapData = (apiData: any):PostJson =>{

    const postJson: PostJson = {
        id: apiData.id,
        slug: null,
        title: null,
        date: null,
        body: null,
        headerImage: null,
        animals:[],
        facilities:[],
        individual_animals:[],
    };

    if(apiData.attributes?.slug){
        postJson.slug = apiData.attributes.slug
    }

    if(apiData.attributes?.title){
        postJson.title = apiData.attributes.title
    }

    if(apiData.attributes?.date){
        postJson.date = apiData.attributes.date
    }

    if(apiData.attributes?.body){
        postJson.body = apiData.attributes.body
    }

    /*
    if(apiData.attributes?.headerImg?.image?.data?.id){
        postJson.id = apiData.attributes?.headerImg?.image?.data?.id
    }
    */

    console.log(postJson)

    return postJson;

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;
    const date = apiData.attributes.date;
    const body = apiData.attributes.body;

    let photos:number[] = [];

    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }

    let headerImage:number = null;

    if (apiData.attributes.headerImg?.image?.data) {
        headerImage = apiData.attributes.headerImg.image.data.id;
    }

    let individual_animals:number[] = [];

    if (undefined !== apiData.attributes.individual_animals) {

        individual_animals = apiData.attributes.individual_animals.data.map((individual_animal) => {
            return individual_animal.id;
        });

    }

    const animals:number[] = [];

    /*
    if (undefined !== apiData.animals) {

        animals = apiData.animals.map((animals) => {
            return animals.id;
        });

    }
    */

    let facilities:number[] = [];
    /*
    if (undefined !== apiData.attributes.facilities) {

        facilities = apiData.attributes.facilities.data.map((facility:FacilityStrapi) => {
            return facility.id;
        });

    }

     */

    return{
        id,
        title,
        slug,
        date,
        body,
        animals,
        individual_animals,
        facilities,
        headerImage,
    };
}
