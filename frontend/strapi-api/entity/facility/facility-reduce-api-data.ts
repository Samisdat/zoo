import {FacilityStrapi} from "./facility-strapi";
import {FacilitySpore} from "./facility-spore";

export const facilityReduceApiData = (apiData: FacilityStrapi):FacilitySpore => {

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;
    const body = apiData.body;
    const type = apiData.type;

    let photos:number[] = [];

    if (undefined !== apiData.photos) {

        photos = apiData.photos.map((photo) => {
            return photo.id;
        });

    }

    let markers:number[] = [];

    if (undefined !== apiData.markers) {

        markers = apiData.markers.map((marker) => {
            return marker.id;
        });

    }

    let animals:number[] = [];

    if (undefined !== apiData.animals) {

        animals = apiData.animals.map((animals) => {
            return animals.id;
        });

    }

    let nodes:number[] = [];

    if (undefined !== apiData.graph_nodes) {

        nodes = apiData.graph_nodes.map((node) => {
            return node.id;
        });

    }
    
    return{
        id,
        slug,
        title,
        body,
        type,
        animals,
        photos,
        markers,
        nodes
    };
}
