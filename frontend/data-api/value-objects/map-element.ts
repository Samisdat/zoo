import {MapElementStrapiJson} from "./starpi-json-interfaces/map-element";
import {MapElementDehydrated, MapElementType} from "./dehydrated-interfaces/map-element";
import {ValueObject} from "./value-object";

export const reduceMapElementApiData = (apiData: MapElementStrapiJson):MapElementDehydrated =>{

    const id = apiData.id;
    const title = apiData.title;
    const geojson = apiData.geojson;
    /*const facility = apiData.facility;*/
    const type = apiData.type;

    return{
        id,
        title,
        geojson,
        /*facility,*/
        type,
    };
}

export class MapElement extends ValueObject<MapElementDehydrated>{

    get id(): number {
        return this.json.id;
    }

    public dehydrate():MapElementDehydrated {
        return this.json;
    }

    static hydrate(dehydrated:MapElementDehydrated):MapElement{

        const mapElement = new MapElement(dehydrated);

        return mapElement;

    }

    static fromApi(json:MapElementStrapiJson):MapElement{

        const dehydrated:MapElementDehydrated = reduceMapElementApiData(json);

        const mapElement = new MapElement(dehydrated);

        return mapElement;

    }
}