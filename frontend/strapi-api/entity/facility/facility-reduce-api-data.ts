import {FacilityStrapi} from "./facility-strapi";
import {FacilitySpore} from "./facility-spore";

export const facilityReduceApiData = (apiData: FacilityStrapi):FacilitySpore =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;
    const body = apiData.body;
    const type = apiData.type;

    return{
        id,
        slug,
        title,
        body,
        type,
    };
}
