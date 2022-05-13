import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchQrCodeById} from "../qr-codes";

describe('QR Code', () => {

    beforeEach(()=>{

        Warehouse.get().hydrate({
            facilities: [],
            photos: [],
            markers: [],
            animals: [],
            individualAnimals: [],
            posts: [],
            qrCodes: [],
            nodes: [],
            edges: [],
        });

    });

    describe('fetchQrCodeById', () => {

        test('valid response with animal', async () => {

            expect(Warehouse.get().hasQrCode(1)).toBeFalsy();
            expect(Warehouse.get().hasAnimal(44)).toBeFalsy();

            await fetchQrCodeById(1);

            expect(Warehouse.get().hasQrCode(1)).toBeTruthy();
            expect(Warehouse.get().hasAnimal(44)).toBeTruthy();

        });

        test('valid response with facility', async () => {

            expect(Warehouse.get().hasQrCode(2)).toBeFalsy();
            expect(Warehouse.get().hasFacility(6)).toBeFalsy();

            await fetchQrCodeById(2);

            expect(Warehouse.get().hasQrCode(2)).toBeTruthy();
            expect(Warehouse.get().hasFacility(6)).toBeTruthy();

        });

    });

});
