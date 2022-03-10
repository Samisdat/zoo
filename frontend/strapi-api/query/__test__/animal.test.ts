import {getRootFixture} from '../../entity/fixtures/get-fixture';

jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

import {getAnimalById, getAnimalBySlug, getAnimals} from '../animals';
import {AnimalStrapi} from '../../entity/animal/animal-strapi-interface';
import {Animal} from '../../entity/animal/animal';

describe('query animal endpoint', ()=>{

    test('get one animal by id', async ()=>{

        const fixtures = await getRootFixture('animal.json');

        const fixture = fixtures.find((animal:AnimalStrapi) => {
            return (47 === animal.id);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const animal = await getAnimalById(47);

        expect(animal).toBeInstanceOf(Animal);
        expect(animal.id).toBe(47);

    });

    test('get one animal by slug', async ()=>{

        const fixtures = await getRootFixture('animal.json');

        const fixture = fixtures.find((animal:AnimalStrapi) => {
            return ('afrikanischer-elefant' === animal.slug);
        });

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixture))
            )
        );

        const animal = await getAnimalBySlug('afrikanischer-elefant');

        expect(animal).toBeInstanceOf(Animal);

        expect(animal.id).toBe(47);

    });

    test('get all animals ', async ()=>{

        const fixtures = await getRootFixture('animal.json');

        (fetch as any).mockReturnValue(
            Promise.resolve(
                new Response(JSON.stringify(fixtures))
            )
        );

        const animals = await getAnimals();

        expect(animals.length).toBe(35);
        expect(animals[0]).toBeInstanceOf(Animal);

    });

});