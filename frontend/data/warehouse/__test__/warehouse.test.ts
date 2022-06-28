import {Warehouse} from '@data/warehouse/warehouse';

describe('warehouse', ()=>{

    test('get one animal by id', async ()=>{

        const warehouse = Warehouse.get();

        expect(warehouse).toBeInstanceOf(Warehouse);

    });

});