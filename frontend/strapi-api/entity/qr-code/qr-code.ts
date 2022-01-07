import {QrCodeSpore} from "./qr-code-spore";
import {Entity} from "../entity";
import {Facility} from "../facility/facility";
import {Warehouse} from "../../warehouse/warehouse";
import {QrCodeStrapi} from "./qr-code-strapi-interface";
import {qrCodeReduceApiData} from "./qr-code-reduce-api-data";

export class QrCode extends Entity<QrCodeSpore>{

    get id(): number {
        return this.json.id;
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

    get facilityRaw(): number{
        return this.json.facility;
    }

    get facility(): Facility{
        return Warehouse.get().getFacility(this.json.facility);
    }

    static hydrate(dehydrated: QrCodeSpore):QrCode{

        const animal = new QrCode(dehydrated);

        return animal;

    }

    static fromApi(json: QrCodeStrapi):QrCode{

        const dehydrated: QrCodeSpore = qrCodeReduceApiData(json);

        const qrCode = new QrCode(dehydrated);

        Warehouse.get().addQrCode(qrCode);

        return qrCode;

    }
}