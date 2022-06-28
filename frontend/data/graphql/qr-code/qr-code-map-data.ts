import {QrCode} from './qr-code';
import {animalMapData} from '../animal/animal-map-data';
import {facilityMapData} from '../facility/facility-map-data';
import {Entity} from '../../entity/entity';

export const qrCodeMapData = (apiData: any):Entity<any>[] =>{

    const entities:Entity<any>[] = [];

    const id = parseInt(apiData.id, 10);

    const title = apiData.attributes.title;
    const lat = apiData.attributes.lat;
    const lng = apiData.attributes.lng;

    let facility = null;

    if(apiData.attributes.facility?.data?.id){

        const facilityEntities = facilityMapData(apiData.attributes.facility?.data);

        const facilityEntity = facilityEntities.find((entity)=>{
            return ('Facility' === entity.entityType);
        });

        for(const entity of facilityEntities){
            entities.push(entity);
        }

        facility = facilityEntity.id;

    }

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


    const json = {
        id,
        title,
        lat,
        lng,
        facility,
        animal,
    };

    const qrCode = QrCode.hydrate(json);

    entities.push(qrCode);

    return entities;

}
