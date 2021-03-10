import {get, list, getDataDir} from "../enclosures";

describe('enclosures', () => {

    test('getDataDir', ()=>{

        expect(getDataDir()).toBe('/Users/samisdat/repos/zoo/data-repos/markdown/enclosures');

    });

    test('get one', async () => {

        const enclosure = await get('affenhaus');

        expect(enclosure.title).toBe('Affenhaus')

    });

    test('list all', async () => {

        const enclosures = await list();

        expect(enclosures.length).toBe(47);

    });

});



