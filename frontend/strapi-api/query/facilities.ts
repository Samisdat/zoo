import {Facility} from '../entity/facility/facility';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById, getPhotoByImageId} from './photos';
import {getAnimalById} from './animals';
import {getMarkerById} from './marker';
import {getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {FacilityStrapi} from '../entity/facility/facility-strapi';
import {getNodeById} from "./graph-elements";

const qs = require('qs');

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

    for (const nodeId of facility.nodesRaw) {

        if (false === Warehouse.get().hasNode(nodeId)) {
            await getNodeById(nodeId);
        }

    }

    if(facility.headerImageRaw){

        /**
         * Strapi does not support
         * Deep filtering isn't available for polymorphic relations
         *
         * So there is no query by image id ...
         *
         */

        const fetchedPhoto = Warehouse.get().getPhotos().find((photo)=>{
            return (facility.headerImageRaw === photo.imageId)
        });

        if(fetchedPhoto){
            facility.headerImageRaw = fetchedPhoto.id;
        }
        else{
            console.log('@WORKAROUND');
            const photo = await getPhotoByImageId(facility.headerImageRaw);
            facility.headerImageRaw = photo.id;
        }

    }

}

export const getFacilityById = async (id: number):Promise<Facility> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/facilities/${id}?${query}`);

    const json = await getJsonFromApi<FacilityStrapi>(requestUrl);

    const facility = Facility.fromApi(json);

    await loadRelations(facility);

    return facility;

}

export const getFacilityBySlug = async (slug: string):Promise<Facility> =>{

    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: [
            '*',
            'photos.*',
            'headerImg.image'
        ],
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/facilities?${query}`);

    const json = await getJsonFromApi<FacilityStrapi[]>(requestUrl);
    console.log(json);
    const facility = Facility.fromApi(json[0]);

    await loadRelations(facility);

    return facility;

}

export const getFacilities = async ():Promise<Facility[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/facilities?${query}`);

    const json = await getJsonFromApi<FacilityStrapi[]>(requestUrl);

    const facilities = json.map(Facility.fromApi);

    for(const facility of facilities){

        await loadRelations(facility);

    }

    return facilities;

}