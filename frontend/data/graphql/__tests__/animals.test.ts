import {fetchAnimalBySlug, fetchAnimals} from "../animals";
import {Warehouse} from "../../warehouse/warehouse";

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

        test('valid response', async () => {

            expect(Warehouse.get().hasAnimal(1)).toBeFalsy();
            expect(Warehouse.get().hasPhoto(16)).toBeFalsy();
            expect(Warehouse.get().hasIndividualAnimal(1)).toBeFalsy();
            expect(Warehouse.get().hasIndividualAnimal(2)).toBeFalsy();

            await fetchAnimalBySlug('afrikanischer-elefant');

            expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
            expect(Warehouse.get().hasPhoto(16)).toBeTruthy();
            expect(Warehouse.get().hasIndividualAnimal(1)).toBeTruthy();
            expect(Warehouse.get().hasIndividualAnimal(2)).toBeTruthy();

        });

        test('valid response with no headerimage', async () => {

            expect(Warehouse.get().hasAnimal(1)).toBeFalsy();

            const animal = await fetchAnimalBySlug('an-existing-slug-no-header-image');

            expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
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
