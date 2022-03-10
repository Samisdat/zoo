import {PostSpore} from '../animal-spore';
import {postReduceApiData} from '../animal-reduce-api-data';
import {getFixture} from '../../fixtures/get-fixture';

describe('reduce api data', ()=>{

    test('standard data', async () => {

        const fixture = await getFixture('animal', 'elefant.json');

        const dehydrated = postReduceApiData(fixture);

        const expectation: PostSpore = {
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

});