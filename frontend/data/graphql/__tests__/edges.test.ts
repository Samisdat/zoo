import {fetchEdges} from '../edges';
import {Warehouse} from '../../warehouse/warehouse';

describe('fetchEdges', () => {

    test('valid response', async () => {

        expect(Warehouse.get().getEdges().length).toBe(0);

        await fetchEdges();

        expect(Warehouse.get().getEdges().length).toBe(340);

        expect(Warehouse.get().getNodes().length).toBe(230);

    });

});