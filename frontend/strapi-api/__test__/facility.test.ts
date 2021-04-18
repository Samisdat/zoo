import {getFixture} from "./fixtures/get-fixture";
import {Facility, reduceFacilityApiData} from "../facility";
import {FacilityDehydrated} from "../dehydrated-interfaces/facility";
import {FacilityStrapiJson} from "../starpi-json-interfaces/facility";

describe('facility value object', ()=>{

    test('reduce api data', async () => {

        const fixture = await getFixture('facility', 'affenhaus.json');

        const dehydrated = reduceFacilityApiData(fixture);

        const expectation: FacilityDehydrated = {
            id: 2,
            slug: 'affenhaus',
            title: 'Affenhaus',
            body: 'Some Content Some other content',
            type: 'enclosure'
        };

        expect(dehydrated).toStrictEqual(expectation);

    });

    test.only('create photo value object from api json', async ()=>{

        const fixture = await getFixture('photo', 'elefant.json');

        const facility = Facility.fromApi(fixture);

        expect(facility.id).toBe(33);
        expect(facility.title).toBe('Elefant');


    });

    test('can by created by api data, dehydrated and hydrated again', async ()=>{

        const fixture = await getFixture('photo', 'elefant.json');

        const facilityFromApi = Facility.fromApi(fixture);

        const dehydrated = facilityFromApi.dehydrate();

        const facility = Facility.hydrate(dehydrated);

        expect(facility.id).toBe(33);
        expect(facility.title).toBe('Elefant');

    });

    test('create photo value object from dehydrated json',()=>{

        const facility = Facility.hydrate({
            id: 33,
            slug: 'elefant',
            title: 'Elefant',
            body: 'Some Content Some other content',
            type: 'enclosure'
        });

        expect(facility.id).toBe(33);
        expect(facility.slug).toBe('elefant');
        expect(facility.title).toBe('Elefant');
        expect(facility.body).toBe('Some Content Some other content');
        expect(facility.type).toBe('enclosure');

    });

});