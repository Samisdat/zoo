import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {fetchNodes} from "../nodes";

describe('fetchNodes', () => {

    test('valid response', async () => {

        expect(Warehouse.get().getNodes().length).toBe(0);

        await fetchNodes();

        expect(Warehouse.get().getNodes().length).toBe(247);

        console.log(Warehouse.get().getNodes()[0]);

    });

});