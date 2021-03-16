import {geojsonFromSvg, getSvg, getSvgPath} from "../geojson-from-svg";

describe('geojson from svg', () => {


    test('getSvgPath', async () => {

        expect(getSvgPath()).toBe('/Users/samisdat/repos/zoo/data-repos/svg/combined.svg');

    });

    test('getSvg', async () => {

        // ein sehr sehr guter test ;)
        expect(getSvg()).toContain('xml');

    });

});



