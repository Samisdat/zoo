import {Photo} from '../photo';
import {getFixture} from '../../fixtures/get-fixture';
import {PhotoJson} from '../photo-spore';
import {reducePhotoApiData} from '../photo-reduce-api-data';

describe('photo reduce api data', ()=>{

    test('standard data', async () => {

        const fixture = await getFixture('photo', 'elefant.json');

        const dehydrated = reducePhotoApiData(fixture);

        const expectation: PhotoJson = {
            copyright: 'Wikipedia',
            id: 33,
            title: 'Elefant',
            thumbnail:{
                width: 234,
                height: 156,
                src: '/uploads/thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
            },
            large:  {
                height: 667,
                src: '/uploads/large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                width: 1000,
            },
            medium:  {
                height: 500,
                src: '/uploads/medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                width: 750,
            },
            small:  {
                height: 333,
                src: '/uploads/small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                width: 500,
            },
            animal: {
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
            }
        };

        expect(dehydrated).toStrictEqual(expectation);

    });

    test('standard data with facility', async () => {

        const fixture = await getFixture('photo', 'musikmuschel.json');

        const photoSpore = reducePhotoApiData(fixture);

        expect(photoSpore.facility).toStrictEqual(      {
            id: 27,
            slug: 'musikmuschel',
            title: 'Musikmuschel',
            body: 'Some Content\n',
            type: 'poi'
        });

    });

});