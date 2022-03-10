import {Entity} from '../entity';
import {MarkerSpore} from './marker-spore';
import {MarkerStrapi} from './marker-strapi';
import {markerReduceApiData} from './marker-reduce-api-data';
import {Warehouse} from '../../warehouse/warehouse';
import {Facility} from '../facility/facility';

export class Marker extends Entity<MarkerSpore>{

    get id(): number {
        return this.json.id;
    }

    get slug(): string {
        return this.json.slug;
    }

    get x(): number {
        return this.json.x;
    }

    get y(): number {
        return this.json.y;
    }

    public dehydrate():MarkerSpore {
        return this.json;
    }

    static hydrate(dehydrated:MarkerSpore):Marker{

        const marker = new Marker(dehydrated);

        return marker;

    }

    static fromApi(json:MarkerStrapi):Marker{

        const dehydrated:MarkerSpore = markerReduceApiData(json);

        const marker = new Marker(dehydrated);

        Warehouse.get().addMarker(marker);

        return marker;

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

    get priority(): number {
        return this.json.priority;
    }

}