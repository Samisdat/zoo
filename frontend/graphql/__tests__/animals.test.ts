import {fetchPostBySlug, fetchPosts} from "../posts";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchAnimalBySlug} from "../animals";

describe('fetchAnimalBySlug', () => {

    beforeEach(()=>{

        Warehouse.get().hydrate({
            facilities: [],
            photos: [],
            markers: [],
            animals: [],
            individualAnimals: [],
            posts: [],
            qrCodes: [],
            nodes: [],
            edges: [],
        });

    });

    test('valid response', async () => {

        expect(Warehouse.get().hasAnimal(1)).toBeFalsy();
        expect(Warehouse.get().hasPhoto(16)).toBeFalsy();

        await fetchAnimalBySlug('an-existing-slug');

        expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
        expect(Warehouse.get().hasPhoto(16)).toBeTruthy();


    });

    /*
    test('valid response with no headerimage', async () => {

        expect(Warehouse.get().hasPost(15)).toBeFalsy();

        const post = await fetchPostBySlug('an-existing-slug-no-header-image');

        expect(Warehouse.get().hasPost(15)).toBeTruthy();
        expect(post.headerImageRaw).toBe(undefined);

    });
     */

});

/*
describe('fetchPosts', () => {

    test('valid response', async () => {

        expect(Warehouse.get().hasPost(5)).toBeFalsy();

        await fetchPosts();

        expect(Warehouse.get().hasPost(5)).toBeTruthy();
        expect(Warehouse.get().hasPhoto(25)).toBeTruthy();


    });

});
 */