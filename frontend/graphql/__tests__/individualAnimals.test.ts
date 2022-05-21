import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchIndividualAnimalBySlug} from "../individual-animals";

describe('fetch IndividualAAnimal', () => {

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

    describe.only('fetchIndividualAnimalBySlug', () => {

        test.only('valid response', async () => {

            expect(Warehouse.get().hasIndividualAnimal(1)).toBeFalsy();
            expect(Warehouse.get().hasAnimal(1)).toBeFalsy();

            await fetchIndividualAnimalBySlug('sabie');

            expect(Warehouse.get().hasIndividualAnimal(1)).toBeTruthy();
            expect(Warehouse.get().getIndividualAnimal(1).name).toBe('Sabie');
            expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
            expect(Warehouse.get().getAnimal(1).title).toBe('Afrikanischer Elefant');

        });

    });

});
