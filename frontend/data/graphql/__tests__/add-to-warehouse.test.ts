import {fetchPostBySlug, fetchPosts} from "../posts";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchAnimalBySlug} from "../animals";
import {AnimalJson, AnimalProfileStrapi} from "../animal/animal-json";
import {IucnStatus} from "../animal/iucnStatus";
import {Animal} from "../animal/animal";
import {addToWarehouse} from "../add-to-warehouse";
import {Entity} from "../../strapi-api/entity/entity";

describe('fetchAnimalBySlug', () => {

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

    test('animal', ()=>{

        const animal:any = jest.fn(():unknown => ({
            id: 1,
            entityType: 'Animal',
        }));

        expect(Warehouse.get().hasAnimal(1)).toBeFalsy();

        addToWarehouse([animal()]);

        expect(Warehouse.get().hasAnimal(1)).toBeTruthy();

    });

    test('Facility', ()=>{

        const animal:any = jest.fn(():unknown => ({
            id: 1,
            entityType: 'Facility',
        }));

        expect(Warehouse.get().hasFacility(1)).toBeFalsy();

        addToWarehouse([animal()]);

        expect(Warehouse.get().hasFacility(1)).toBeTruthy();

    });

});
