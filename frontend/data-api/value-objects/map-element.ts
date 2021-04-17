import {PhotoDehydrated} from "./dehydrated-interfaces/photo";
import {FacilityStrapiJson} from "./starpi-json-interfaces/facility";
import {FacilityDehydrated, FacilityType} from "./dehydrated-interfaces/facility";
import {MapElementStrapiJson} from "./starpi-json-interfaces/map-element";
import {MapElementDehydrated, MapElementType} from "./dehydrated-interfaces/map-element";
import {Feature} from "geojson";

export const reduceMapElementApiData = (apiData: MapElementStrapiJson):MapElementDehydrated =>{

    const id = apiData.id;
    const title = apiData.title;
    const geojson = apiData.geojson;
    /*const facility = apiData.facility;*/
    const type = apiData.type;

    return{
        _type:'dehydrated',
        id,
        title,
        geojson,
        /*facility,*/
        type,
    };
}

export class MapElement{

    private json: MapElementDehydrated ;

    constructor(json: MapElementStrapiJson | MapElementDehydrated) {

        if(undefined === json._type || 'dehydrated' !== json._type){

            json = reduceMapElementApiData(json as MapElementStrapiJson);

        }

        this.json = json as MapElementDehydrated;
    }

    get id(): number {
        return this.json.id;
    }

    public dehydrate():MapElementDehydrated {
        return this.json;
    }

}

export const createMapElement = (json:MapElementStrapiJson | MapElementDehydrated):MapElement => {
    return new MapElement(json);
}