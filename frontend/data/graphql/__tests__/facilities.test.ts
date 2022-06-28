import {fetchFacilities, fetchFacilityBySlug} from "../facilities";
import {Warehouse} from "../../warehouse/warehouse";

describe('Facility', () => {

    const resetWarehouse = ()=> {

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

    };

    describe.only('fetchFacilityBySlug', () => {

        test.only('valid response', async () => {

            expect(Warehouse.get().hasFacility(5)).toBeFalsy();
            expect(Warehouse.get().hasPhoto(81)).toBeFalsy();
            expect(Warehouse.get().hasNode(1571)).toBeFalsy();

            await fetchFacilityBySlug('eingang');

            expect(Warehouse.get().hasFacility(5)).toBeTruthy();
            expect(Warehouse.get().hasPhoto(81)).toBeTruthy();
            expect(Warehouse.get().hasNode(1571)).toBeTruthy();

        });

        test('valid response with no headerimage', async () => {

            expect(Warehouse.get().hasFacility(5)).toBeFalsy();

            const facility = await fetchFacilityBySlug('bongos');

            expect(Warehouse.get().hasFacility(3)).toBeTruthy();
            expect(facility?.headerImageRaw).toBe(null);

        });

    });

    describe.skip('fetchFacilities', () => {

        beforeEach(resetWarehouse);

        test('valid response', async () => {

            expect(Warehouse.get().hasFacility(5)).toBeFalsy();

            await fetchFacilities();

            expect(Warehouse.get().hasFacility(5)).toBeTruthy();
            expect(Warehouse.get().getFacilities().length).toBe(36);

        });

    });

});
