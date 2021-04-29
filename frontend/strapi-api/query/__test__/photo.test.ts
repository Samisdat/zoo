import {getRootFixture} from "../../entity/fixtures/get-fixture";

jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

import {getAnimalById, getAnimalBySlug, getAnimals} from "../animals";
import {AnimalStrapi} from "../../entity/animal/animal-strapi-interface";
import {Animal} from "../../entity/animal/animal";
import {getPhotoById, getPhotos, PhotoType} from "../photos";
import {PhotoStrapi} from "../../entity/photo/photo-strapi";
import {Photo} from "../../entity/photo/photo";

describe('query photo endpoint', ()=>{

    test.only('get one photo by id', async ()=>{

        const fixtures = await getRootFixture('photo.json');

        const fixture = fixtures.find((photo:PhotoStrapi) => {
            return (1 === photo.id);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const photo = await getPhotoById(1);

        expect(photo).toBeInstanceOf(Photo);
        expect(photo.id).toBe(1);

    });


    test('get all photos ', async ()=>{

        const fixtures = await getRootFixture('photo.json');

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixtures))
            )
        );

        const photos = await getPhotos();

        expect(photos.length).toBe(39);
        expect(photos[0]).toBeInstanceOf(Photo);

    });

});