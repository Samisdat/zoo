import {getRootFixture} from "../../entity/fixtures/get-fixture";

jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');
import {MapElementStrapi} from "../../entity/map-element/map-element-strapi";
import {getMapElementById} from "../map-elements";
import {MapElement} from "../../entity/map-element/map-element";

describe('query map-elements endpoint', ()=>{

    test('get one map-elements by id', async ()=>{

        const fixtures = await getRootFixture('map-element.json');

        const fixture = fixtures.find((mapElements:MapElementStrapi) => {
            return (61 === mapElements.id);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const mapElement = await getMapElementById(61);

        expect(mapElement).toBeInstanceOf(MapElement);
        expect(mapElement.id).toBe(61);

    });

    /*
    test('get one animal by slug', async ()=>{

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

    test('get all animals ', async ()=>{

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
    */
});