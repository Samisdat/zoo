import {FacilityStrapi} from './facility-strapi';
import {FacilitySpore} from './facility-spore';

export const facilityReduceApiData = (apiData: FacilityStrapi):FacilitySpore => {

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;
    const body = apiData.attributes.body;
    const type = apiData.attributes.type;

    let photos:number[] = [];

    /*
    if (undefined !== apiData.photos) {

        photos = apiData.photos.map((photo) => {
            return photo.id;
        });

    }
     */

    let markers:number[] = [];

    /*
    if (undefined !== apiData.markers) {

        markers = apiData.markers.map((marker) => {
            return marker.id;
        });

    }
     */

    let animals:number[] = [];

    /*
    if (undefined !== apiData.animals) {

        animals = apiData.animals.map((animals) => {
            return animals.id;
        });

    }
     */

    let nodes:number[] = [];

    /*
    if (undefined !== apiData.graph_nodes) {

        nodes = apiData.graph_nodes.map((node) => {
            return node.id;
        });

    }
     */
    
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
