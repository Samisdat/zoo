import {getFixture} from '../../fixtures/get-fixture';
import {facilityMapData} from '../facility-reduce-api-data';
import {FacilityJson} from '../facility-json';

describe('facility reduce api data', ()=>{

    test('standard data', async () => {

        const fixture = await getFixture('facility', 'affenhaus.json');

        const dehydrated = facilityMapData(fixture);

        const expectation: FacilityJson = {
            id: 2,
            slug: 'affenhaus',
            title: 'Affenhaus',
            body: 'Some Content Some other content',
            type: 'enclosure'
        };

        expect(dehydrated).toStrictEqual(expectation);

    });



});