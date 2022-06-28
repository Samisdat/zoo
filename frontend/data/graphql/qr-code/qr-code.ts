import {QrCodeJson} from './qr-code-json';
import {Facility} from '../facility/facility';
import {Animal} from '../animal/animal';
import {Entity, EntityType} from '../../entity/entity';
import {Warehouse} from '../../warehouse/warehouse';

export class QrCode extends Entity<QrCodeJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'QrCode';
    }

    get title(): string{
        return this.json.title;
    }

    get lat(): string{
        return this.json.lat;
    }

    get lng(): string{
        return this.json.lng;
    }

    get facilityRaw(): number|undefined{
        return this.json.facility;
    }

    get facility(): Facility{
        return Warehouse.get().getFacility(this.json.facility);
    }

    get animalRaw(): number{
        return this.json.animal;
    }

    get animal(): Animal{
        return Warehouse.get().getAnimal(this.json.animal);
    }

    static hydrate(dehydrated: QrCodeJson):QrCode{

        const qrCode = new QrCode(dehydrated);

        return qrCode;

    }

    static fromApi(json: any):QrCode{

        return undefined;

    }
}