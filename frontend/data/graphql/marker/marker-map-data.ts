import {MarkerJson} from "./marker-json";
import {facilityMapData} from "../facility/facility-map-data";
import {Marker} from "./marker";
import {Entity} from "../../entity/entity";

export const markerMapData = (apiData: any, facilityId:number):Entity<any>[] => {

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );

    const slug = apiData.attributes.slug;
    const x = apiData.attributes.x;
    const y = apiData.attributes.y;
    const priority = apiData.attributes.priority;

    let facility = facilityId;

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
