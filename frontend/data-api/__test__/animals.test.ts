import {getAnimalBySlug, getAnimals} from "../animals";


describe('animals', ()=>{

    test('get all published animals', async ()=>{

        const facilities = await getAnimals();

        expect(facilities).toMatchSnapshot();

    });

    test('get animal by slug', async ()=>{

        const facilitiy = await getAnimalBySlug('afrikanischer-elefant');

        expect(facilitiy).toMatchSnapshot();

    });
    
});