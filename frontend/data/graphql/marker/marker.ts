import {Entity, EntityType} from '../../entity/entity';
import {MarkerJson} from './marker-json';
import {Facility} from '../facility/facility';
import {Warehouse} from '../../warehouse/warehouse';
import {getImagePath} from '../../../helper/getImagePath';

export class Marker extends Entity<MarkerJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Marker';
    }

    get slug(): string {
        return this.facility.slug;
    }

    get x(): number {
        return this.json.x;
    }

    get y(): number {
        return this.json.y;
    }

    public dehydrate():MarkerJson {
        return this.json;
    }

    static hydrate(dehydrated:MarkerJson):Marker{

        const marker = new Marker(dehydrated);

        return marker;

    }

    static fromApi(json:any):Marker{

        return undefined;

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

    get markerImage():string {

        if(this.facility.headerImage){
            return getImagePath(this.facility.headerImage.thumbnail.src);
        }

        if(0 !== this.facility.animals.length){

            const animalsWithImage = this.facility.animals.find((animal)=>{
                return (animal.headerImage);
            });

            return getImagePath(animalsWithImage.headerImage.thumbnail.src)

        }

        return null;
    }

}