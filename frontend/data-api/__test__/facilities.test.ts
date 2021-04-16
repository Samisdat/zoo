import {getFacilities, getFacilityBySlug} from "../facilities";

describe('facilities', ()=>{

    test('get all published facilities', async ()=>{

        const facilities = await getFacilities();

        expect(facilities).toMatchSnapshot();

    });

    test('get facility by slug', async ()=>{

        const facilitiy = await getFacilityBySlug('affenhaus');

        expect(facilitiy).toMatchSnapshot();

    });

});