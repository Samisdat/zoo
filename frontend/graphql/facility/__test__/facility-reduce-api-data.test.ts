import {getFixture} from '../../fixtures/get-fixture';
import {facilityReduceApiData} from '../facility-reduce-api-data';
import {FacilitySpore} from '../facility-spore';

describe('facility reduce api data', ()=>{

    test('standard data', async () => {

        const fixture = await getFixture('facility', 'affenhaus.json');

        const dehydrated = facilityReduceApiData(fixture);

        const expectation: FacilitySpore = {
            id: 2,
            slug: 'affenhaus',
            title: 'Affenhaus',
            body: 'Some Content Some other content',
            type: 'enclosure'
        };

        expect(dehydrated).toStrictEqual(expectation);

    });



});