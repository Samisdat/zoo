import {addMetaInfo} from "../[slug]";

import { createMocks } from 'node-mocks-http';
import handleUpdate from '../[slug]';

describe('geojson/update endpoint', () => {

    it('returns status 400 and error message if slug is undefined', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {},
        });

        await handleUpdate(req, res);

        expect(res._getStatusCode()).toBe(400);

        const responseJson = JSON.parse(res._getData());

        expect(responseJson).toEqual(
            { msg: 'slug not defined' }
        );
    });

    it('returns status 400 and error message if slug can not be resolved', async () => {

        const { req, res } = createMocks({
            method: 'GET',
            query: {
                slug: 'not-existing',
            },
        });

        await handleUpdate(req, res);

        expect(res._getStatusCode()).toBe(400);

        const responseJson = JSON.parse(res._getData());

        expect(responseJson).toEqual(
            { msg: 'slug can not be resolved' }
        );
    });

    it('returns status 200 and an object for valid slug', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                slug: 'ententeich',
            },
        });

        await handleUpdate(req, res);

        expect(res._getStatusCode()).toBe(200);

        const responseJson = JSON.parse(res._getData());

        expect(responseJson).toEqual(
            {
                "fill": "#AADAFF",
                "name": "Ententeich",
                "slug": "ententeich",
                "zIndex": 9,
            }
        );
    });

    it.only('returns status 200 and an object for valid slug', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                slug: 'way-simple',
            },
        });

        await handleUpdate(req, res);

        expect(res._getStatusCode()).toBe(200);

        const responseJson = JSON.parse(res._getData());

        expect(responseJson).toEqual(
            {
                "fill": "none",
                "name": "Wege Simple",
                "slug": "way-simple",
                "zIndex": 10,
            }
        );
    });

});

describe('update/create geojson ', () => {

    it('adds meta info to svg if not yet present - multiline', ()=>{

        const svgWithoutMetaInfo = `<svg width="100%" height="100%" viewBox="0 0 2550 1994" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g id="Zoo"></g>
        </svg>`;

        expect(svgWithoutMetaInfo).not.toEqual(expect.stringContaining('MetaInfo'));

        const svg = addMetaInfo(svgWithoutMetaInfo);

        expect(svg).toEqual(expect.stringContaining('MetaInfo'));
        expect(svg).toMatchSnapshot();

    });

    it('adds meta info to svg if not yet present - singleline', ()=>{

        const svgWithoutMetaInfo = `<svg width="100%" height="100%" viewBox="0 0 2550 1994" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g id="Zoo"></g></svg>`;

        expect(svgWithoutMetaInfo).not.toEqual(expect.stringContaining('MetaInfo'));

        const svg = addMetaInfo(svgWithoutMetaInfo);

        expect(svg).toEqual(expect.stringContaining('MetaInfo'));
        expect(svg).toMatchSnapshot();

    });

    it('leave svg untouched if meta info is already present - multiline', ()=>{

        const svgWithoutMetaInfo = `<svg width="100%" height="100%" viewBox="0 0 2550 1994" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <MetaInfo xmlns="http://www.prognoz.ru">
                <Geo>
                    <GeoItem X="0" Y="0" Latitude="51.24177020918754" Longitude="7.105611562728882"/>
                    <GeoItem X="2550" Y="1994" Latitude="51.236776961813064" Longitude="7.115809321403503"/>
                </Geo>
            </MetaInfo>
            <g id="Zoo"></g>
        </svg>`;

        expect(svgWithoutMetaInfo).toEqual(expect.stringContaining('MetaInfo'));

        const svg = addMetaInfo(svgWithoutMetaInfo);

        expect(svg).toEqual(expect.stringContaining('MetaInfo'));
        expect(svg).toMatchSnapshot();


    });

    it('leave svg untouched if meta info is already present - singleline', ()=>{

        const svgWithoutMetaInfo = `<svg width="100%" height="100%" viewBox="0 0 2550 1994" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><MetaInfo xmlns="http://www.prognoz.ru"><Geo><GeoItem X="0" Y="0" Latitude="51.24177020918754" Longitude="7.105611562728882"/><GeoItem X="2550" Y="1994" Latitude="51.236776961813064" Longitude="7.115809321403503"/></Geo></MetaInfo><g id="Zoo"></g></svg>`;

        expect(svgWithoutMetaInfo).toEqual(expect.stringContaining('MetaInfo'));

        const svg = addMetaInfo(svgWithoutMetaInfo);

        expect(svg).toEqual(expect.stringContaining('MetaInfo'));
        expect(svg).toMatchSnapshot();

    });

});


