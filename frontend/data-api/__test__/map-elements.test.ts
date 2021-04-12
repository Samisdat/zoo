import {getMapElements} from "../map-elements";

describe('map-elements', ()=>{

    test('get all published map elements', async ()=>{

        const mapElements = await getMapElements();

        expect(mapElements).toMatchSnapshot();

    });

});