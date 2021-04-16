import {createPhoto, reducePhotoApiData} from '../photo';
import path from 'path';
import {PhotoDehydrated} from '../dehydrated-interfaces/photo';

const fs = require('fs');
const FIXTURES_BASE_DIR = `${__dirname}/fixtures/`;

const getFixture = async (dir:string, fixture:string):Promise<any> => {

    const fixturePath = path.resolve(
        FIXTURES_BASE_DIR,
        dir,
        fixture
    );

    const fixtureContent = await fs.readFileSync(fixturePath, {encoding: 'utf8'});

    return JSON.parse(fixtureContent);

}

describe('photo value object', ()=>{

    test('reduce api data', async () => {
        const fixture = await getFixture('photo', 'elefant.json');

        const dehydrated = reducePhotoApiData(fixture);

        const expectation: PhotoDehydrated = {
            _type: 'dehydrated',
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
        };

        expect(dehydrated).toStrictEqual(expectation);

    });

    test('create photo value object from api json', async ()=>{

        const fixture = await getFixture('photo', 'elefant.json');

        const photo = createPhoto(fixture);

        expect(photo.id).toBe(33);
        expect(photo.title).toBe('Elefant');
        expect(photo.copyright).toBe('Wikipedia');

        expect(photo.thumbnail).toStrictEqual({
            width: 234,
            height: 156,
            src: '/uploads/thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
        });

    });

    test('can by created by api data, dehydrated and hydrated again', async ()=>{

        const fixture = await getFixture('photo', 'elefant.json');

        const photoFromApi = createPhoto(fixture);

        const dehydrated = photoFromApi.dehydrate();

        const photo = createPhoto(dehydrated);

        expect(photo.id).toBe(33);
        expect(photo.title).toBe('Elefant');
        expect(photo.copyright).toBe('Wikipedia');

    });

    test('create photo value object from dehydrated json',()=>{
        
        const photo = createPhoto({
            _type: 'dehydrated',
            copyright: 'Wikipedia',
            id: 33,
            title: 'Elefant',
            thumbnail:{
                'width': 234,
                'height': 156,
                src: '/uploads/thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg'
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

        });

        expect(photo.id).toBe(33);
        expect(photo.title).toBe('Elefant');
        expect(photo.copyright).toBe('Wikipedia');

    });

});