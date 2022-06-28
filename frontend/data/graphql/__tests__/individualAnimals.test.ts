import {fetchIndividualAnimalBySlug, fetchIndividualAnimals} from '../individual-animals';
import {Warehouse} from '../../warehouse/warehouse';

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

    describe('fetchIndividualAnimalBySlug', () => {

        test('valid response', async () => {

            expect(Warehouse.get().hasIndividualAnimal(1)).toBeFalsy();
            expect(Warehouse.get().hasAnimal(1)).toBeFalsy();

            await fetchIndividualAnimalBySlug('sabie');

            expect(Warehouse.get().hasIndividualAnimal(1)).toBeTruthy();
            expect(Warehouse.get().getIndividualAnimal(1).name).toBe('Sabie');
            expect(Warehouse.get().hasAnimal(1)).toBeTruthy();
            expect(Warehouse.get().getAnimal(1).title).toBe('Afrikanischer Elefant');

        });

    });

    describe('fetchIndividualAnimals', () => {

        test('valid response', async () => {

            expect(Warehouse.get().getIndividualAnimals().length).toBe(0);

            await fetchIndividualAnimals();

            expect(Warehouse.get().getIndividualAnimals().length).toBe(2);

        });

    });

});
