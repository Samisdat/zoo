import {
    ensureGroupPresent,
    generateXmlContainingType,
    geojsonFromSvg, getElementIds, getGeojsonFromSvg,
    getSvg,
    getSvgPath,
    matchGroup, writeGeojsonContainingType, writeXmlContainingType
} from "../geojson-from-svg";
import {getDataDir} from "../data-helper";
import {forOfStatement} from "@babel/types";

describe('geojson from svg', () => {


    test('getSvgPath', async () => {

        expect(getSvgPath()).toBe('/Users/samisdat/repos/zoo/data-repos/svg/combined.svg');

    });

    test('getSvg', async () => {

        // ein sehr sehr guter test ;)
        expect(getSvg()).toContain('xml');

    });

    test('geojsonFromSvg exceptionThrown when type is not supported', ()=>{

        expect(
            ()=>{
                geojsonFromSvg('foobar')
            }
        ).toThrow(Error);

    });

    test('ensureGroupPresent', ()=>{

        const xml = '<g id="bounding-box">foobar</g>';

        expect(
            ensureGroupPresent(xml, 'bounding-box')
        ).toBeTruthy();

    });

    test('ensureGroupPresent', ()=>{

        const xml = '<g id="bounding-box">foobar</g>';

        expect(
            ensureGroupPresent(xml, 'facility-box')
        ).toBeFalsy();

    });

    test('matchGroup', ()=>{

        const xml = '<g id="bounding-box">foobar</g>';

        expect(
            matchGroup(xml, 'bounding-box')
        ).toMatchSnapshot();

    });

    test('generateXmlContainingType', ()=>{

        const xml = getSvg();

        expect(
            generateXmlContainingType(xml, 'bounding-box')
        ).toMatchSnapshot();

    });

    test.skip('writeXmlContainingType', ()=>{

        const xml = getSvg();

        expect(
            writeXmlContainingType(xml, 'bounding-box')
        ).toMatchSnapshot();

    });


    test('geojsonFromSvg', ()=>{

        expect(
            geojsonFromSvg('facility-circle')
        ).toMatchSnapshot();

    });

    test('getElementIds', ()=>{

        const xml = getSvg();

        const ids = getElementIds(xml);

        expect(ids).toMatchSnapshot();

    });

    test('getGeojsonFromSvg', async ()=>{

        const xml = getSvg();

        const dataSvg = generateXmlContainingType(xml, 'bounding-box')

        const geojson = await getGeojsonFromSvg(dataSvg, 'bounding-box');

        expect(geojson).toMatchSnapshot();

    });

    test.skip('writeGeojsonContainingType', async ()=>{

        const xml = getSvg();

        const dataSvg = generateXmlContainingType(xml, 'bounding-box')

        const geojson = await getGeojsonFromSvg(dataSvg, 'bounding-box');

        writeGeojsonContainingType(
            geojson,
            'bounding-box'
        );
    });

});



