import {IndividualAnimalJson} from './individual-animal-json';
import {photoMapData} from '../photo/photo-map-data';
import {IndividualAnimal} from './individual-animal';
import {animalMapData} from '../animal/animal-map-data';
import {Entity} from '../../entity/entity';


export const individualAnimalMapData = (apiData: any):Entity<any>[] =>{

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );

    const slug = apiData.attributes.slug;
    const name = apiData.attributes.name;
    const body = apiData.attributes.body;

    let animal = null;

    if (apiData.attributes.animal?.data?.id) {

        const animalEntities = animalMapData(apiData.attributes.animal?.data);

        const animalEntity = animalEntities.find((entity)=>{
            return ('Animal' === entity.entityType);
        });

        for(const entity of animalEntities){
            entities.push(entity);
        }

        animal = animalEntity.id;

    }

    /*
    let photos:number[] = [];

    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }
     */

    let headerImage:number | null = null;
    if (apiData.attributes.media?.headerImage?.data) {

        const photo = photoMapData(apiData.attributes.media?.headerImage?.data);

        entities.push(photo);

        headerImage = photo.id;

    }


    const json: IndividualAnimalJson = {
        id,
        name,
        slug,
        body,
        animal,
        photos:[],
        headerImage
    };

    const individualAnimal = IndividualAnimal.hydrate(json);

    entities.push(individualAnimal);

    return entities;


}
