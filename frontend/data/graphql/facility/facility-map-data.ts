import {FacilityJson} from './facility-json';
import {photoMapData} from "../photo/photo-map-data";
import {Facility} from "./facility";
import {animalMapData} from "../animal/animal-map-data";
import {Entity} from "../../entity/entity";
import {markerMapData} from "../marker/marker-map-data";
import {nodeMapData} from "../node/node-map-data";

export const facilityMapData = (apiData: any):Entity<any>[] => {

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;
    const body = apiData.attributes.body;
    const type = apiData.attributes.type;

    let markers:number[] = [];

    if (apiData.attributes.markers) {

        markers = apiData.attributes.markers.data.map((markerDatum)=>{

            const markerEntities = markerMapData(markerDatum, id);

            const marker = markerEntities.find((entity)=>{
                return ('Marker' === entity.entityType);
            });

            for(const entity of markerEntities){
                entities.push(entity);
            }

            return marker.id;

        });

    }

    let animals:number[] = [];

    if (apiData.attributes.animals) {

        animals = apiData.attributes.animals.data.map((animalDatum)=>{

            const animalEntities = animalMapData(animalDatum);

            const animal = animalEntities.find((entity)=>{
                return ('Animal' === entity.entityType);
            });

            for(const entity of animalEntities){
                entities.push(entity);
            }

            return animal.id;

        });

    }


    let nodes:number[] = [];

    if (apiData.attributes.graph_nodes) {

        nodes = apiData.attributes.graph_nodes.data.map((nodeDatum)=>{

            const nodeEntities = nodeMapData(nodeDatum);

            const node = nodeEntities.find((entity)=>{
                return ('Node' === entity.entityType);
            });

            for(const entity of nodeEntities){
                entities.push(entity);
            }

            return node.id;

        });

    }

    let headerImage:number | null = null;

    if (apiData.attributes.headerImg?.image?.data) {

        const photo = photoMapData(apiData.attributes.headerImg?.image?.data);

        entities.push(photo);

        headerImage = photo.id;

    }

    const facilityJson: FacilityJson = {
        id,
        slug,
        title,
        body,
        type,
        animals,
        markers,
        nodes,
        headerImage,
    };

    const facility = Facility.hydrate(facilityJson);

    entities.push(facility)

    return entities;

}
