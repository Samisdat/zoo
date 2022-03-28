import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {Animal} from '../entity/animal/animal';
import {AnimalStrapi} from '../entity/animal/animal-strapi-interface';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {getIndividualAnimalById} from './individual-animals';
import {getFacilityById} from './facilities';

const qs = require('qs');

export const loadRelations = async (animal:Animal) => {

    if(null !== animal.photosRaw){

        for (const photoId of animal.photosRaw) {

            if (false === Warehouse.get().hasPhoto(photoId)) {
                await getPhotoById(photoId);
            }

        }

    }

    if(null !== animal.facilitiesRaw){

        for (const facilityId of animal.facilitiesRaw) {

            if (false === Warehouse.get().hasFacility(facilityId)) {
                await getFacilityById(facilityId);
            }

        }

    }

    if(null !== animal.individualAnimals){

        for (const individualAnimal of animal.individualAnimalsRaw) {

            if (false === Warehouse.get().hasIndividualAnimal(individualAnimal)) {
                await getIndividualAnimalById(individualAnimal);
            }

        }

    }

}

export const getAnimalById = async (id: number):Promise<Animal> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/animals/${id}?${query}`);

    const json = await getJsonFromApi<AnimalStrapi>(requestUrl);

    const animal = Animal.fromApi(json);

    await loadRelations(animal);

    return animal;

}


export const getAnimalBySlug = async (slug: string):Promise<Animal> =>{

    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: '*',
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/animals?${query}`);

    const json = await getJsonFromApi<AnimalStrapi>(requestUrl);

    const animal = Animal.fromApi(json[0]);

    await loadRelations(animal);

    return animal;

}

export const getAnimals = async ():Promise<Animal[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/animals?${query}`);

    const json = await getJsonFromApi<AnimalStrapi[]>(requestUrl);

    console.log(json)

    const animals = json.map(Animal.fromApi);

    for(const animal of animals){

        await loadRelations(animal);

    }

    return animals;

}