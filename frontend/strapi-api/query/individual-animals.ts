import {getStrapiUrl} from "../../data-api/utils/get-strapi-url";
import {getJsonFromApi} from "../../data-api/utils/get-json-from-api";
import {Warehouse} from "../warehouse/warehouse";
import {getPhotoById} from "./photos";
import {IndividualAnimalStrapi} from "../entity/individual-animal/individual-animal-strapi-interface";
import {IndividualAnimal} from "../entity/individual-animal/individual-animal";
import {getAnimalById} from "./animals";

export const loadRelations = async (individualAnimal:IndividualAnimal) => {

    if (false === Warehouse.get().hasAnimal(individualAnimal.animalRaw)) {
        await getAnimalById(individualAnimal.animalRaw);
    }

    if(null !== individualAnimal.photosRaw){

        for (const photoId of individualAnimal.photosRaw) {

            if (false === Warehouse.get().hasPhoto(photoId)) {
                await getPhotoById(photoId);
            }

        }

    }

}

export const getIndividualAnimalById = async (id: number):Promise<IndividualAnimal> =>{

    const requestUrl = getStrapiUrl(`/individual-animals/${id}`);

    const json = await getJsonFromApi<IndividualAnimalStrapi>(requestUrl);

    const individualAnimal = IndividualAnimal.fromApi(json);

    await loadRelations(individualAnimal);

    return individualAnimal;

}

export const getIndividualAnimalBySlug = async (slug: string):Promise<IndividualAnimal> =>{

    const requestUrl = getStrapiUrl(`/individual-animals?slug=${slug}`);

    const json = await getJsonFromApi<IndividualAnimalStrapi>(requestUrl);

    console.log(json)

    const individualAnimal = IndividualAnimal.fromApi(json[0]);

    await loadRelations(individualAnimal);

    return individualAnimal;

}

export const getIndividualAnimals = async ():Promise<IndividualAnimal[]> =>{

    const requestUrl = getStrapiUrl('/individual-animals')

    const json = await getJsonFromApi<IndividualAnimalStrapi[]>(requestUrl);

    const individualAnimals = json.map(IndividualAnimal.fromApi);

    for(const individualAnimal of individualAnimals){

        await loadRelations(individualAnimal);

    }

    return individualAnimals;

}