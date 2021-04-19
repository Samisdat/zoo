import {Photo} from "../photo";
import {getFixture} from "../../fixtures/get-fixture";

describe('photo value object', ()=>{

    test('create photo value object from api json', async ()=>{

        const fixture = await getFixture('photo', 'elefant.json');

        const photo = Photo.fromApi(fixture);

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

        const photoFromApi = Photo.fromApi(fixture);

        const spore = photoFromApi.dehydrate();

        const photo = Photo.hydrate(spore);

        expect(photo.id).toBe(33);
        expect(photo.title).toBe('Elefant');
        expect(photo.copyright).toBe('Wikipedia');

    });

    test('create photo value object from dehydrated json',()=>{
        
        const photo = Photo.hydrate({
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