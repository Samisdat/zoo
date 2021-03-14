import {get, list} from "../aninals";

describe('animals', () => {

    test('get one', async () => {

        const animal = await get('afrikanischer-elefant');

        expect(animal.title).toBe('Afrikanischer Elefant')

    });

    test('list all', async () => {

        const animals = await list();

        expect(animals.length).toBe(45);

    });

});



