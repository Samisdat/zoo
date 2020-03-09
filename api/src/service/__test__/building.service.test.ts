import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import {BuildingService} from "../building.service";
import {DATABASE_URL, WELCOME_MESSAGE} from "../../constants";
import mongoose from 'mongoose';
import {Building} from "../../model/building";

describe('BasketCardComponent', () => {

    let buildingService:BuildingService

    let request:any;
    let response:any;

    beforeAll(async ()=>{

        await mongoose.connect('mongodb://mongo/jest', { useNewUrlParser: true });

        await Building.remove({})
        buildingService = new BuildingService();
    })

    beforeEach(() => {

        request = new Request('/users?sort=desc', {
            headers: {
                Accept: 'text/html'
            }
        });

        response = new Response();

    });

    afterEach(() => {
        request.resetMocked();
        response.resetMocked();

    });

    test ('welcome message', async () => {

        await buildingService.welcomeMessage(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.send).toBeCalledWith(WELCOME_MESSAGE);

    });

    test ('getAllBuildings', async () => {

        await buildingService.getAllBuildings(request, response);

        const buildings = response.json.mock.calls[0][0];
        console.log(buildings)

        expect(buildings.length).toBe(0);

    });

    test.only ('addNewBuilding', async () => {

        request.setBody({
            "name": "JEST"
        });

        await buildingService.addNewBuilding(request, response);

        const building = response.json.mock.calls[0];
        console.log(building)

        expect(building.name).toBe('Jest');

    });

});
