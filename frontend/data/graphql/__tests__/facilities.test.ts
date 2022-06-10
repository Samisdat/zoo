import {fetchFacilities, fetchFacilityBySlug} from "../facilities";
import {Warehouse} from "../../warehouse/warehouse";

describe('Facility', () => {

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

    describe('fetchFacilityBySlug', () => {

        test('valid response', async () => {

            expect(Warehouse.get().hasFacility(5)).toBeFalsy();
            expect(Warehouse.get().hasPhoto(79)).toBeFalsy();

            await fetchFacilityBySlug('an-existing-slug');

            expect(Warehouse.get().hasFacility(5)).toBeTruthy();
            expect(Warehouse.get().hasPhoto(79)).toBeTruthy();


        });

        test('valid response with no headerimage', async () => {

            expect(Warehouse.get().hasFacility(5)).toBeFalsy();

            const facility = await fetchFacilityBySlug('an-existing-slug-no-header-image');

            expect(Warehouse.get().hasFacility(5)).toBeTruthy();
            expect(facility?.headerImageRaw).toBe(null);

        });

    });

    describe('fetchPosts', () => {

        test('valid response', async () => {

            expect(Warehouse.get().hasFacility(5)).toBeFalsy();

            await fetchFacilities();

            expect(Warehouse.get().hasFacility(5)).toBeTruthy();
            expect(Warehouse.get().getFacilities().length).toBe(4);
            expect(Warehouse.get().hasPhoto(79)).toBeTruthy();


        });

    });

});
