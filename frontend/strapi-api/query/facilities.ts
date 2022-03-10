import {Facility} from '../entity/facility/facility';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {getAnimalById} from './animals';
import {getMarkerById} from './marker';
import {getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {FacilityStrapi} from '../entity/facility/facility-strapi';

export const loadRelations = async (facility:Facility) => {

    for (const photoId of facility.photosRaw) {

        if (false === Warehouse.get().hasPhoto(photoId)) {
            await getPhotoById(photoId);
        }

    }

    for (const animalId of facility.animalsRaw) {

        if (false === Warehouse.get().hasAnimal(animalId)) {
            await getAnimalById(animalId);
        }

    }

    for (const markerId of facility.markersRaw) {

        if (false === Warehouse.get().hasMarker(markerId)) {
            await getMarkerById(markerId);
        }

    }

}

export const getFacilityById = async (id: number):Promise<Facility> =>{

    const requestUrl = getStrapiUrl(`/facilities/${id}`);

    const json = await getJsonFromApi<FacilityStrapi>(requestUrl);

    const facility = Facility.fromApi(json);

    await loadRelations(facility);

    return facility;

}

export const getFacilityBySlug = async (slug: string):Promise<Facility> =>{

    const requestUrl = getStrapiUrl(`/facilities?slug=${slug}`);

    const json = await getJsonFromApi<FacilityStrapi[]>(requestUrl);

    const facility = Facility.fromApi(json[0]);

    await loadRelations(facility);

    return facility;

}

export const getFacilities = async ():Promise<Facility[]> =>{

    const requestUrl = getStrapiUrl('/facilities');

    const json = await getJsonFromApi<FacilityStrapi[]>(requestUrl);

    const facilities = json.map(Facility.fromApi);

    for(const facility of facilities){

        await loadRelations(facility);

    }

    return facilities;

}