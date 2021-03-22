import {getEnclosure, listEnclosures} from "../enclosures";

describe('enclosures', () => {

    test('get one', async () => {

        const enclosure = await getEnclosure('affenhaus');

        expect(enclosure.title).toBe('Affenhaus')

    });

    test('list all', async () => {

        const enclosures = await listEnclosures();

        expect(enclosures.length).toBe(41);

        expect(enclosures).toMatchSnapshot();

    });

});



