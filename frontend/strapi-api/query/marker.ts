import {getFacilityById} from './facilities';
import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Warehouse} from '../warehouse/warehouse';
import {Marker} from '../entity/marker/marker';
import {MarkerStrapi} from '../entity/marker/marker-strapi';

const qs = require('qs');

export const loadRelations = async (marker:Marker) => {

    if(null !== marker.facilityRaw){

        if (false === Warehouse.get().hasFacility(marker.facilityRaw)) {
            await getFacilityById(marker.facilityRaw);
        }

    }

}

export const getMarkerById = async (markerId:number):Promise<Marker> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/markers/${markerId}?${query}`);

    const json = await getJsonFromApi<MarkerStrapi>(requestUrl);

    const marker = Marker.fromApi(json);

    await loadRelations(marker);

    return marker;

}

export const getMarkers = async ():Promise<Marker[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/markers?${query}`);

    const json = await getJsonFromApi<MarkerStrapi[]>(requestUrl);

    const markers = json.map(Marker.fromApi);

    for(const marker of markers){

        await loadRelations(marker);

    }

    return markers;


}