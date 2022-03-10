import {getStrapiUrl} from '../utils/get-strapi-url';
import {Animal} from '../entity/animal/animal';
import {AnimalStrapi} from '../entity/animal/animal-strapi-interface';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {getIndividualAnimalById} from './individual-animals';
import {getFacilityById} from './facilities';

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

    const requestUrl = getStrapiUrl(`/animals/${id}`);

    const json = await getJsonFromApi<AnimalStrapi>(requestUrl);

    const animal = Animal.fromApi(json);

    await loadRelations(animal);

    return animal;

}


export const getAnimalBySlug = async (slug: string):Promise<Animal> =>{

    const requestUrl = getStrapiUrl(`/animals?slug=${slug}`);

    const json = await getJsonFromApi<AnimalStrapi>(requestUrl);

    const animal = Animal.fromApi(json[0]);

    await loadRelations(animal);

    return animal;

}

export const getAnimals = async ():Promise<Animal[]> =>{

    const requestUrl = getStrapiUrl('/animals' /*'/animals?_publicationState=preview&_limit=-1'*/)

    const json = await getJsonFromApi<AnimalStrapi[]>(requestUrl);

    const animals = json.map(Animal.fromApi);

    for(const animal of animals){

        await loadRelations(animal);

    }

    return animals;

}