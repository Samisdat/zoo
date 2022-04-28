import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {AnimalProfileStrapi, AnimalStrapi} from '../entity/animal/animal-strapi-interface';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Warehouse} from '../warehouse/warehouse';
import {getIndividualAnimalById} from './individual-animals';
import {IndividualAnimalStrapi} from '../entity/individual-animal/individual-animal-strapi-interface';

const qs = require('qs');

export const loadRelations = async (animal:Animal) => {

    /*
    if(null !== animal.photosRaw){

        for (const photoId of animal.photosRaw) {

            if (false === Warehouse.get().hasPhoto(photoId)) {
                await getPhotoById(photoId);
            }

        }

    }
    */
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

    /*
    if(animal.headerImageRaw){

        /**
         * Strapi does not support
         * Deep filtering isn't available for polymorphic relations
         *
         * So there is no query by image id ...
         *


        const fetchedPhoto = Warehouse.get().getPhotos().find((photo)=>{
            return (animal.headerImageRaw === photo.imageId)
        });

        if(fetchedPhoto){
            animal.headerImageRaw = fetchedPhoto.id;
        }
        else{
            console.log('@WORKAROUND');
            const photo = await getPhotoByImageId(animal.headerImageRaw);
            animal.headerImageRaw = photo.id;
        }

    }
     */

}

export const getAnimalById = async (id: number):Promise<Animal> =>{

    const query = qs.stringify({
        populate: [
            'profile.*',
            'individual_animals.*',
            'facilities.*',
            'photos.*',
            'headerImg.image'
        ],

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
        populate: [
            'profile.*',
            'individual_animals.*',
            'facilities.*',
            'photos.*',
            'headerImg.image'
        ],
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/animals?${query}`);

    const json = await getJsonFromApi<AnimalStrapi>(requestUrl);

    //console.log('headerImg', json[0].attributes.headerImg.image);

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

    const animals = json.map(Animal.fromApi);

    for(const animal of animals){

        await loadRelations(animal);

    }

    return animals;

}