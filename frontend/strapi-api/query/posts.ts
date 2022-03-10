import {getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Post} from '../entity/post/post';
import {PostStrapi} from '../entity/post/post-strapi-interface';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {getIndividualAnimalById} from './individual-animals';
import {getAnimalById} from './animals';
import {getFacilityById} from './facilities';

export const loadRelations = async (post:Post) => {

    if(null !== post.facilitiesRaw){

        for (const facilityId of post.facilitiesRaw) {

            if (false === Warehouse.get().hasFacility(facilityId)) {
                await getFacilityById(facilityId);
            }

        }

    }

    if(null !== post.photosRaw){

        for (const photoId of post.photosRaw) {

            if (false === Warehouse.get().hasPhoto(photoId)) {
                await getPhotoById(photoId);
            }

        }

    }

    if(null !== post.animalsRaw){

        for (const animalId of post.animalsRaw) {

            if (false === Warehouse.get().hasAnimal(animalId)) {
                await getAnimalById(animalId);
            }

        }

    }

    if(null !== post.individualAnimals){

        for (const individualAnimal of post.individualAnimalsRaw) {

            if (false === Warehouse.get().hasIndividualAnimal(individualAnimal)) {
                await getIndividualAnimalById(individualAnimal);
            }

        }

    }

}

export const getPostById = async (id: number):Promise<Post> =>{

    const requestUrl = getStrapiUrl(`/posts/${id}`);

    const json = await getJsonFromApi<PostStrapi>(requestUrl);

    const post = Post.fromApi(json);

    await loadRelations(post);

    return post;

}

export const getPostBySlug = async (slug: string):Promise<Post> =>{

    const requestUrl = getStrapiUrl(`/posts?slug=${slug}`);

    const json = await getJsonFromApi<PostStrapi>(requestUrl);

    const post = Post.fromApi(json[0]);

    await loadRelations(post);

    return post;

}


export const getPosts = async ():Promise<Post[]> =>{

    const requestUrl = getStrapiUrl('/posts?_sort=published_at:DESC')

    const json = await getJsonFromApi<PostStrapi[]>(requestUrl);

    const posts = json.map(Post.fromApi);

    for(const post of posts){

        await loadRelations(post);

    }

    return posts;

}
