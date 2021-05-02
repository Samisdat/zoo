import {Entity} from "../entity";
import {MapElementSpore, MapElementType} from "./map-element-spore";
import {mapElementReduceApiData} from "./map-element-reduce-api-data";
import {MapElementStrapi} from "./map-element-strapi";
import {
    Feature,
    GeometryCollection,
    LineString,
    MultiLineString,
    MultiPoint,
    MultiPolygon,
    Point,
    Polygon
} from "geojson";
import {FacilitySpore} from "../facility/facility-spore";
import {Warehouse} from "../../warehouse/warehouse";
import {Facility} from "../facility/facility";
import {randomExponential} from "d3-random";
import {Photo} from "../photo/photo";


export interface MapElementProperties{
    name: string;
    facility?:Facility,
    type: MapElementType
}

export class MapElement extends Entity<MapElementSpore>{

    get id(): number {
        return this.json.id;
    }

    get type(): string {
        return 'Feature';
    }

    // @TODO use only supported types
    get geometry(): Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection{

        // for reason d3 v6 renders polygons as rectangle
        // this is the workaround

        const type = this.json.geojson.geometry.type;

        console.log(this.json.geojson)

        if('Polygon' !== type){
            return this.json.geojson.geometry;
        }

        const polygon:Feature<Polygon> = this.json.geojson as Feature<Polygon>;

        const geojson = this.json.geojson;

        geojson.geometry = {
            type: 'LineString',
            coordinates: polygon.geometry.coordinates[0]
        };

        return geojson.geometry;

    }

    get properties(): MapElementProperties{

        const mapElementProperties: MapElementProperties = {
            name: this.json.title,
            type: this.json.type,
        };

        if(null !== this.facilityRaw){
            mapElementProperties.facility = this.facility;
        }

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

        Warehouse.get().addMapElement(mapElement);

        return mapElement;

    }

    get facilityRaw(): number  | null {

        return this.json.facility;
    }

    get facility(): Facility  | null{

        if(null === this.facilityRaw){
            return null;
        }

        return Warehouse.get().getFacility(this.facilityRaw);

    }

    get photos(): Photo[] {

        let photos = [];

        // use image(s) of facility or images if facility's animals
        if(0 !== this.facility.photos.length){
            photos = this.facility.photos;
        }
        else if(0 !== this.facility.animals.length){

            for(const animal of this.facility.animals){

                for(const photo of animal.photos){

                    photos.push(photo);

                }

            }

        }

        return photos;

    }


}