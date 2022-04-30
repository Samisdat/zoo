import {FacilityJson} from './facility-json';
import {Entity} from "../../strapi-api/entity/entity";
import {photoMapData} from "../photo/photo-map-data";
import {Facility} from "./facility";

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

    let photos:number[] = [];

    /*
    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }
     */

    let markers:number[] = [];

    /*
    if (undefined !== apiData.attributes.markers) {

        markers = apiData.attributes.markers.data.map((marker) => {
            return marker.id;
        });

    }
    */

    let animals:number[] = [];

    /*
    if (undefined !== apiData.attributes.animals) {

        animals = apiData.attributes.animals.data.map((animals) => {
            return animals.id;
        });

    }
     */

    let nodes:number[] = [];

    /*
    if (undefined !== apiData.attributes.graph_nodes) {

        nodes = apiData.attributes.graph_nodes.data.map((node) => {
            return node.id;
        });

    }
     */

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
        photos,
        markers,
        nodes,
        headerImage,
    };

    const facility = Facility.hydrate(facilityJson);

    entities.push(facility)

    return entities;

}
