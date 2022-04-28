import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchAnimalBySlug, fetchAnimals} from "../animals";

describe('fetch Animal', () => {

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

    describe.only('fetchAnimalBySlug', () => {

        test.only('valid response', async () => {

            expect(Warehouse.get().hasAnimal(1)).toBeFalsy();
            expect(Warehouse.get().hasPhoto(16)).toBeFalsy();

            await fetchAnimalBySlug('an-existing-slug');

            expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
            expect(Warehouse.get().hasPhoto(16)).toBeTruthy();

            console.log(Warehouse.get().getAnimal(1))


        });

        test('valid response with no headerimage', async () => {

            expect(Warehouse.get().hasAnimal(3)).toBeFalsy();

            const animal = await fetchAnimalBySlug('an-existing-slug-no-header-image');

            expect(Warehouse.get().hasAnimal(3)).toBeTruthy();
            expect(animal.headerImageRaw).toBe(null);

        });


    });

    describe('fetchAnimals', () => {

        test('valid response', async () => {

            expect(Warehouse.get().hasAnimal(1)).toBeFalsy();
            expect(Warehouse.get().hasPhoto(16)).toBeFalsy();
            expect(Warehouse.get().hasAnimal(2)).toBeFalsy();
            expect(Warehouse.get().hasPhoto(79)).toBeFalsy();
            expect(Warehouse.get().hasAnimal(3)).toBeFalsy();

            await fetchAnimals();

            expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
            expect(Warehouse.get().hasPhoto(16)).toBeTruthy();
            expect(Warehouse.get().hasAnimal(2)).toBeTruthy();
            expect(Warehouse.get().hasPhoto(79)).toBeTruthy();
            expect(Warehouse.get().hasAnimal(3)).toBeTruthy();

        });

    });
});
