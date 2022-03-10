import {get, getSupportedTypes, isSupportedType} from '../geojson';

describe('geojson', () => {

    test('supported types', async () => {

        expect(getSupportedTypes()).toStrictEqual([
            'bounding-box',
            'border',
            'way',
            'facility-box',
            'facility-circle',
        ]);

    });

    test('type is supported', async () => {

        expect(isSupportedType('bounding-box')).toBeTruthy();

    });

    test('type is not supported', async () => {

        expect(isSupportedType('foobar')).toBeFalsy();

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



