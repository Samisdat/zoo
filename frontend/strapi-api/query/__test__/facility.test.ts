import {getRootFixture} from '../../entity/fixtures/get-fixture';

jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

import {FacilityStrapi} from '../../entity/facility/facility-strapi';
import {getFacilities, getFacilityById, getFacilityBySlug} from '../facilities';
import {Facility} from '../../entity/facility/facility';

describe('query facility endpoint', ()=>{

    test('get one facility by id', async ()=>{

        const fixtures = await getRootFixture('facility.json');

        const fixture = fixtures.find((facility:FacilityStrapi) => {
            return (6 === facility.id);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const facility = await getFacilityById(6);

        expect(facility).toBeInstanceOf(Facility);
        expect(facility.id).toBe(6);

    });

    test.only('get one facility by id', async ()=>{

        const fixtures = await getRootFixture('facility.json');

        const fixture = fixtures.find((facility:FacilityStrapi) => {
            return (13 === facility.id);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const facility = await getFacilityById(13);

        expect(facility).toBeInstanceOf(Facility);
        expect(facility.id).toBe(13);
        expect(facility.animalsRaw).toStrictEqual([47]);

    });

    test('get one facility by slug', async ()=>{

        const fixtures = await getRootFixture('facility.json');

        const fixture = fixtures.find((facility:FacilityStrapi) => {
            return ('baeren' === facility.slug);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const facility = await getFacilityBySlug('baeren');

        expect(facility).toBeInstanceOf(Facility);
        expect(facility.id).toBe(6);

    });

    test('get all facilities ', async ()=>{

        const fixtures = await getRootFixture('facility.json');

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixtures))
            )
        );

        const facilities = await getFacilities();

        expect(facilities.length).toBe(31);
        expect(facilities[0]).toBeInstanceOf(Facility);

    });

});