import {fetchNodes} from '../nodes';
import {Warehouse} from '../../warehouse/warehouse';

describe('fetchNodes', () => {

    test('valid response', async () => {

        expect(Warehouse.get().getNodes().length).toBe(0);

        await fetchNodes();

        expect(Warehouse.get().getNodes().length).toBe(247);

    });

});