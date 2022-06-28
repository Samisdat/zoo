import {fetchAnimalBySlug} from '../animals';
import {Animal} from '../animal/animal';
import {addToWarehouse} from '../add-to-warehouse';
import {Warehouse} from '../../warehouse/warehouse';

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

    test('animal', ()=>{

        const animal:any = jest.fn(():unknown => ({
            id: 1,
            entityType: 'Animal',
        }));

        expect(Warehouse.get().hasAnimal(1)).toBeFalsy();

        addToWarehouse([animal()]);

        expect(Warehouse.get().hasAnimal(1)).toBeTruthy();

    });

    test('Facility', ()=>{

        const animal:any = jest.fn(():unknown => ({
            id: 1,
            entityType: 'Facility',
        }));

        expect(Warehouse.get().hasFacility(1)).toBeFalsy();

        addToWarehouse([animal()]);

        expect(Warehouse.get().hasFacility(1)).toBeTruthy();

    });

});
