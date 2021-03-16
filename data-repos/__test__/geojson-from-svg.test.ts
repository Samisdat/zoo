import {
    ensureGroupPresent,
    generateXmlContainingType,
    geojsonFromSvg,
    getSvg,
    getSvgPath,
    matchGroup, writeXmlContainingType
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


    test('geojsonFromSvg exceptionThrown when type is not supported', ()=>{

        geojsonFromSvg('facility-circle');

    });

});



