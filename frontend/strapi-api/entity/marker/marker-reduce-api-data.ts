import {MarkerStrapi} from './marker-strapi';
import {MarkerSpore} from './marker-spore';

export const markerReduceApiData = (apiData: MarkerStrapi):MarkerSpore =>{

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const x = apiData.attributes.x;
    const y = apiData.attributes.y;
    const priority = apiData.attributes.priority;

    const markerSpore: MarkerSpore = {
        id,
        slug,
        x,
        y,
        priority,
        facility: null
    };

    let facility = null;

    if(undefined !== apiData.attributes.facility?.data.id){

        facility = apiData.attributes.facility.data.id;

    }

    markerSpore.facility = facility;

    return markerSpore;
}
