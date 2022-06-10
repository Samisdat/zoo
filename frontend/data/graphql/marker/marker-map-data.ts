import {Entity} from "../../strapi-api/entity/entity";
import {MarkerJson} from "./marker-json";
import {facilityMapData} from "../facility/facility-map-data";
import {Marker} from "./marker";

export const markerMapData = (apiData: any):Entity<any>[] => {

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );

    const slug = apiData.attributes.slug;
    const x = apiData.attributes.x;
    const y = apiData.attributes.y;
    const priority = apiData.attributes.priority;

    let facility: number|null = null;

    if (apiData.attributes.facility?.data) {

        const facilityEntities = facilityMapData(apiData.attributes.facility.data);

        const facilityEntity = facilityEntities.find((entity)=>{
            return ('Facility' === entity.entityType);
        });

        for(const entity of facilityEntities){
            entities.push(entity);
        }

        facility = facilityEntity.id;

    }

    const json: MarkerJson = {
        id,
        slug,
        x,
        y,
        priority,
        facility
    };

    const marker = Marker.hydrate(json);

    entities.push(marker);

    return entities;

}
