import {FacilityJson} from './facility-json';

export const facilityMapData = (apiData: any):FacilityJson => {

    const id = parseInt(apiData.id);
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
    };

    if(apiData.attributes?.headerImg?.image?.data?.id){
        facilityJson.headerImage = parseInt(
            apiData.attributes?.headerImg?.image?.data?.id, 10
        );
    }


    return facilityJson;

}
