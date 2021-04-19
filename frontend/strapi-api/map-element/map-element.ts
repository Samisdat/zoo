import {ValueObject} from "../value-object";
import {MapElementSpore} from "./map-element-spore";
import {mapElementReduceApiData} from "./map-element-reduce-api-data";
import {MapElementStrapi} from "./map-element-strapi";

export class MapElement extends ValueObject<MapElementSpore>{

    get id(): number {
        return this.json.id;
    }

    public dehydrate():MapElementSpore {
        return this.json;
    }

    static hydrate(dehydrated:MapElementSpore):MapElement{

        const mapElement = new MapElement(dehydrated);

        return mapElement;

    }

    static fromApi(json:MapElementStrapi):MapElement{

        const dehydrated:MapElementSpore = mapElementReduceApiData(json);

        const mapElement = new MapElement(dehydrated);

        return mapElement;

    }
}