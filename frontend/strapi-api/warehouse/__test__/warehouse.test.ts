import {getRootFixture} from '../../entity/fixtures/get-fixture';

jest.mock('node-fetch');
import fetch from 'node-fetch';
import {Warehouse} from '../warehouse';
const { Response } = jest.requireActual('node-fetch');

describe('warehouse', ()=>{

    test('get one animal by id', async ()=>{

        const warehouse = Warehouse.get();

        expect(warehouse).toBeInstanceOf(Warehouse);

    });

});