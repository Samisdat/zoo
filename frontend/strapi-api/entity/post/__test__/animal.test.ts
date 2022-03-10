import {getFixture} from '../../fixtures/get-fixture';
import {Post} from '../animal';

describe('animal value object', ()=>{

    test('create animal value object from api json', async ()=>{

        const fixture = await getFixture('animal', 'elefant.json');

        const animal = Post.fromApi(fixture);

        expect(animal.id).toBe(47);
        expect(animal.slug).toBe('afrikanischer-elefant');
        expect(animal.title).toBe('Afrikanischer Elefant');
        expect(animal.scientificName).toBe('Loxodonta africana');
        expect(animal.body).toBe('\nI am content.\n');


    });

    test('can by created by api data, dehydrated and hydrated again', async ()=>{

        const fixture = await getFixture('animal', 'elefant.json');

        const animalFromApi = Post.fromApi(fixture);

        const dehydrated = animalFromApi.dehydrate();

        const animal = Post.hydrate(dehydrated);

        expect(animal.id).toBe(47);
        expect(animal.slug).toBe('afrikanischer-elefant');
        expect(animal.title).toBe('Afrikanischer Elefant');
        expect(animal.scientificName).toBe('Loxodonta africana');
        expect(animal.body).toBe('\nI am content.\n');

    });

    test('create photo value object from dehydrated json',()=>{

        const animal = Post.hydrate({
            id: 47,
            title: 'Afrikanischer Elefant',
            slug: 'afrikanischer-elefant',
            wikidata: 'Q36557',
            wikipediaLink: 'https://de.wikipedia.org/wiki/Afrikanischer_Elefant',
            scientificName: 'Loxodonta africana',
            iucnID: '12392',
            iucnLink: 'https://apiv3.iucnredlist.org/api/v3/taxonredirect/12392',
            iucnStatus: 'Q278113',
            body: '\nI am content.\n',
            className: null,
            order: 'Rüsseltiere',
            species: 'Afrikanischer Elefant',
            family: 'Elefanten'
        });

        expect(animal.id).toBe(47);
        expect(animal.slug).toBe('afrikanischer-elefant');
        expect(animal.title).toBe('Afrikanischer Elefant');
        expect(animal.scientificName).toBe('Loxodonta africana');
        expect(animal.body).toBe('\nI am content.\n');

    });

});