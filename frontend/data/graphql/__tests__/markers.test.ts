import {fetchMarkers} from '../markers';
import {Warehouse} from '../../warehouse/warehouse';

describe('fetchMarkers', () => {

    test('valid response', async () => {

        expect(Warehouse.get().getMarkers().length).toBe(0);

        await fetchMarkers();

        expect(Warehouse.get().getMarkers().length).toBe(36);
        expect(Warehouse.get().getFacilities().length).toBe(36);
        
    });

});