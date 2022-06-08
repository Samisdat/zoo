import {Entity} from "../strapi-api/entity/entity";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Animal} from "./animal/animal";
import {Facility} from "./facility/facility";
import {Photo} from "./photo/photo";
import {QrCode} from "./qr-code/qr-code";
import {IndividualAnimal} from "./individual-animal/individual-animal";
import {Post} from "./post/post";

const addEntityToWarehouse = (entity:Entity<any>):void =>{

    switch(entity.entityType) {
        case 'Animal': {

            Warehouse.get().addAnimal(entity as Animal);

            break;
        }
        case 'IndividualAnimal': {

            Warehouse.get().addIndividualAnimal(entity as IndividualAnimal);

            break;
        }
        case 'Facility': {

            Warehouse.get().addFacility(entity as Facility);

            break;
        }
        case 'Photo': {

            Warehouse.get().addPhoto(entity as Photo);

            break;
        }
        case 'QrCode': {

            Warehouse.get().addQrCode(entity as QrCode);

            break;
        }
        case 'Post': {

            Warehouse.get().addPost(entity as Post);

            break;
        }
        default: {
            console.log('something went wrong')
            break;
        }
    }

}

export const addToWarehouse = (entities:Entity<any>[]) => {

    for(let i = 0, x = entities.length; i < x; i += 1){

        addEntityToWarehouse(entities[i]);

    }

}
