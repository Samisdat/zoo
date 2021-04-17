import {createPhoto, reducePhotoApiData} from '../photo';
import path from 'path';
import {PhotoDehydrated} from '../dehydrated-interfaces/photo';
import {getFixture} from "./fixtures/get-fixture";
import {createFacility, reduceFacilityApiData} from "../facility";
import {FacilityDehydrated} from "../dehydrated-interfaces/facility";
import {createAnimal, reduceAnimalApiData} from "../animal";
import {AnimalyDehydrated} from "../dehydrated-interfaces/animal";

describe('animal value object', ()=>{

    test('reduce api data', async () => {

        const fixture = await getFixture('animal', 'elefant.json');

        const dehydrated = reduceAnimalApiData(fixture);

        const expectation: AnimalyDehydrated = {
            _type: 'dehydrated',
            id: 47,
            slug: 'afrikanischer-elefant',
            title: 'Afrikanischer Elefant',
            body: '\nI am content.\n',
            className: null,
            family: 'Elefanten',
            iucnID: '12392',
            iucnLink: 'https://apiv3.iucnredlist.org/api/v3/taxonredirect/12392',
            iucnStatus: 'Q278113',
            order: 'Rüsseltiere',
            scientificName: 'Loxodonta africana',
            species: 'Afrikanischer Elefant',
            wikidata: 'Q36557',
            wikipediaLink: 'https://de.wikipedia.org/wiki/Afrikanischer_Elefant',
        };

        expect(dehydrated).toStrictEqual(expectation);

    });

    test('create animal value object from api json', async ()=>{

        const fixture = await getFixture('animal', 'elefant.json');

        const animal = createAnimal(fixture);

        expect(animal.id).toBe(47);
        expect(animal.slug).toBe('afrikanischer-elefant');
        expect(animal.title).toBe('Afrikanischer Elefant');
        expect(animal.scientificName).toBe('Loxodonta africana');
        expect(animal.body).toBe('\nI am content.\n');


    });

    test('can by created by api data, dehydrated and hydrated again', async ()=>{

        const fixture = await getFixture('animal', 'elefant.json');

        const animalFromApi = createAnimal(fixture);

        const dehydrated = animalFromApi.dehydrate();

        const animal = createAnimal(dehydrated);

        expect(animal.id).toBe(47);
        expect(animal.slug).toBe('afrikanischer-elefant');
        expect(animal.title).toBe('Afrikanischer Elefant');
        expect(animal.scientificName).toBe('Loxodonta africana');
        expect(animal.body).toBe('\nI am content.\n');

    });

    test('create photo value object from dehydrated json',()=>{

        const animal = createAnimal({
            _type: 'dehydrated',
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