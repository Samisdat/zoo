import {Entity} from "../entity";
import {MapElementSpore, MapElementType} from "./map-element-spore";
import {mapElementReduceApiData} from "./map-element-reduce-api-data";
import {MapElementStrapi} from "./map-element-strapi";
import {GeometryCollection, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon} from "geojson";


export interface MapElementProperties{
    name: string;
    /*facility,*/
    type: MapElementType
}

export class MapElement extends Entity<MapElementSpore>{

    get id(): number {
        return this.json.id;
    }

    get type(): string {
        return 'Feature';
    }

    get geometry(): Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection{
        return this.json.geojson.geometry;
    }

    get properties(): MapElementProperties{

        const mapElementProperties: MapElementProperties = {
            name: this.json.title,
            type: this.json.type
        };

        return mapElementProperties;
    }

    /**
     * The feature's geometry

    geometry: G;
    /**
     * A value that uniquely identifies this feature in a
     * https://tools.ietf.org/html/rfc7946#section-3.2.

     id?: string | number;
    /**
     * Properties associated with this feature.
    properties: P;
     */

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