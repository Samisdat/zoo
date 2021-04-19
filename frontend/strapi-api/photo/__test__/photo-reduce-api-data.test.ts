import {Photo} from "../photo";
import {getFixture} from "../../fixtures/get-fixture";
import {PhotoSpore} from "../photo-spore";
import {reducePhotoApiData} from "../photo-reduce-api-data";

describe('photo reduce api data', ()=>{

    test('standard data', async () => {
        const fixture = await getFixture('photo', 'elefant.json');

        const dehydrated = reducePhotoApiData(fixture);

        const expectation: PhotoSpore = {
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

});