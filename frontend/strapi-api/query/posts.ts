import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Post} from '../entity/post/post';
import {PostStrapi} from '../entity/post/post-strapi-interface';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {getIndividualAnimalById} from './individual-animals';
import {getAnimalById} from './animals';
import {getFacilityById} from './facilities';
import {Facility} from "../entity/facility/facility";
import {Photo} from "../entity/photo/photo";

const qs = require('qs');

export const loadRelations = async (post:PostStrapi) => {

    if(undefined !== post.attributes.facilities){

        for (const facility of post.attributes.facilities.data) {

            if (false === Warehouse.get().hasFacility(facility.id)) {

                Facility.fromApi(facility);

            }

        }

    }


    if(null !== post.attributes.photos){

        for (const photo of post.attributes.photos.data) {

            if (false === Warehouse.get().hasPhoto(photo.id)) {
                await getPhotoById(photo.id);
            }

        }

    }
    /*
    if(null !== post.animalsRaw){

        for (const animalId of post.animalsRaw) {

            if (false === Warehouse.get().hasAnimal(animalId)) {
                await getAnimalById(animalId);
            }

        }

    }
    */
    if(null !== post.attributes.individual_animals){

        for (const individualAnimal of post.attributes.individual_animals.data) {

            if (false === Warehouse.get().hasIndividualAnimal(individualAnimal.id)) {
                await getIndividualAnimalById(individualAnimal.id);
            }

        }

    }

}

export const getPostById = async (id: number):Promise<Post> =>{

    const requestUrl = getStrapi3Url(`/posts/${id}`);

    const json = await getJsonFromApi<PostStrapi>(requestUrl);

    const post = Post.fromApi(json);

    await loadRelations(json);

    return post;

}

export const getPostBySlug = async (slug: string):Promise<Post> =>{

    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            'facilities':'*',
            'animals':'*',
            'photos':'*',
            'individual_animals': '*'
        }
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/posts?${query}`);

    const json = await getJsonFromApi<PostStrapi>(requestUrl);

    const post = Post.fromApi(json[0]);

    await loadRelations(json[0]);

    return post;

}



export const getPosts = async ():Promise<Post[]> =>{

    const query = qs.stringify({
        ort: ['date:desc'],
        pagination: {
            pageSize: 1000,
        },
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/posts?${query}`);

    const json = await getJsonFromApi<PostStrapi[]>(
        requestUrl,
    );
    const posts = json.map(Post.fromApi);

    /*
    for(const post of posts){

        await loadRelations(post);

    }
     */

    return posts;

}
