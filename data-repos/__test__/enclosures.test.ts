import {get, list} from "../enclosures";

describe('enclosures', () => {

    test('get one', async () => {

        const enclosure = await get('affenhaus');

        expect(enclosure.title).toBe('Affenhaus')

    });

    test('list all', async () => {

        const enclosures = await list();

        expect(enclosures.length).toBe(41);

    });

});



