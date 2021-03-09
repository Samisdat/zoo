import {get, list, getDataDir} from "../aninals";

describe('animals', () => {

    test('getDataDir', ()=>{

        expect(getDataDir()).toBe('/Users/samisdat/repos/zoo/data-repos/markdown/animals');

    });

    test('get one', async () => {

        const animal = await get('afrikanischer-elefant');

        expect(animal.title).toBe('Afrikanischer Elefant')

    });

    test('list all', async () => {

        const animals = await list();

        expect(animals.length).toBe(255);

    });

});



