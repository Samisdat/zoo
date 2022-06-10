import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchNodes} from "../nodes";
import {fetchEdges} from "../edges";

describe('fetchEdges', () => {

    test('valid response', async () => {

        expect(Warehouse.get().getEdges().length).toBe(0);

        await fetchEdges();

        expect(Warehouse.get().getEdges().length).toBe(340);

        console.log(Warehouse.get().getNodes().length);

    });

});