import {get, isAllowedType} from "../geojson";

describe('geojson', () => {

    test('type is allowed', async () => {

        expect(isAllowedType('bounding-box')).toBeTruthy();

    });

    test('type is not allowed', async () => {

        expect(isAllowedType('foobar')).toBeFalsy();

    });

    test('get border', async ()=>{

        const boundingbox = await get('border');

        expect(boundingbox).toMatchSnapshot();

    });

    test('get boundingbox', async ()=>{

        const boundingbox = await get('bounding-box');

        expect(boundingbox).toMatchSnapshot();

    });

    test('get facility-boxes', async ()=>{

        const boundingbox = await get('facility-box');

        expect(boundingbox).toMatchSnapshot();

    });

    test('get facility-circles', async ()=>{

        const boundingbox = await get('facility-circle');

        expect(boundingbox).toMatchSnapshot();

    });

    test('get ways', async ()=>{

        const boundingbox = await get('way');

        expect(boundingbox).toMatchSnapshot();

    });

});



