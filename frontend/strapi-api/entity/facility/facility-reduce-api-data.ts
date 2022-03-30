import {FacilityStrapi} from './facility-strapi';
import {FacilitySpore} from './facility-spore';

export const facilityReduceApiData = (apiData: FacilityStrapi):FacilitySpore => {

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;
    const body = apiData.attributes.body;
    const type = apiData.attributes.type;

    let photos:number[] = [];

    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }

    let markers:number[] = [];

    if (undefined !== apiData.attributes.markers) {

        markers = apiData.attributes.markers.data.map((marker) => {
            return marker.id;
        });

    }

    let animals:number[] = [];

    if (undefined !== apiData.attributes.animals) {

        animals = apiData.attributes.animals.data.map((animals) => {
            return animals.id;
        });

    }

    let nodes:number[] = [];

    if (undefined !== apiData.attributes.graph_nodes) {

        nodes = apiData.attributes.graph_nodes.data.map((node) => {
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
