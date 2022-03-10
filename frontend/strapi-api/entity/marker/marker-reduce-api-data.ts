import {MarkerStrapi} from './marker-strapi';
import {MarkerSpore} from './marker-spore';

export const markerReduceApiData = (apiData: MarkerStrapi):MarkerSpore =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const x = apiData.x;
    const y = apiData.y;
    const priority = apiData.priority;

    const markerSpore: MarkerSpore = {
        id,
        slug,
        x,
        y,
        priority,
        facility: null
    };

    let facility = null;

    if(undefined !== apiData.facility?.id){

        facility = apiData.facility.id;

    }

    markerSpore.facility = facility;

    return markerSpore;
}
