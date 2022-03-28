import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {IndividualAnimalStrapi} from '../entity/individual-animal/individual-animal-strapi-interface';
import {IndividualAnimal} from '../entity/individual-animal/individual-animal';
import {getAnimalById} from './animals';

const qs = require('qs');

export const loadRelations = async (individualAnimal:IndividualAnimal) => {

    console.log(Warehouse.get().hasAnimal(individualAnimal.animalRaw))
    if (false === Warehouse.get().hasAnimal(individualAnimal.animalRaw)) {
        await getAnimalById(individualAnimal.animalRaw);
    }

    console.log(Warehouse.get().hasAnimal(individualAnimal.animalRaw))
    /*
    if(null !== individualAnimal.photosRaw){

        for (const photoId of individualAnimal.photosRaw) {

            if (false === Warehouse.get().hasPhoto(photoId)) {
                await getPhotoById(photoId);
            }

        }

    }

     */

}

export const getIndividualAnimalById = async (id: number):Promise<IndividualAnimal> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/individual-animals/${id}?${query}`);

    const json = await getJsonFromApi<IndividualAnimalStrapi>(requestUrl);

    const individualAnimal = IndividualAnimal.fromApi(json);

    await loadRelations(individualAnimal);

    return individualAnimal;

}

export const getIndividualAnimalBySlug = async (slug: string):Promise<IndividualAnimal> =>{

    const requestUrl = getStrapi3Url(`/individual-animals?slug=${slug}`);

    const json = await getJsonFromApi<IndividualAnimalStrapi>(requestUrl);

    const individualAnimal = IndividualAnimal.fromApi(json[0]);

    await loadRelations(individualAnimal);

    return individualAnimal;

}

export const getIndividualAnimals = async ():Promise<IndividualAnimal[]> =>{

    const requestUrl = getStrapi3Url('/individual-animals')

    const json = await getJsonFromApi<IndividualAnimalStrapi[]>(requestUrl);

    const individualAnimals = json.map(IndividualAnimal.fromApi);

    for(const individualAnimal of individualAnimals){

        await loadRelations(individualAnimal);

    }

    return individualAnimals;

}