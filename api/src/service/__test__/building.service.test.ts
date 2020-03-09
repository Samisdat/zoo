import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import {BuildingService} from "../building.service";
import {WELCOME_MESSAGE} from "../../constants";

describe('BasketCardComponent', () => {

    let request:any;
    let response:any;

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

    test ('One test', async () => {

        const buildingService = new BuildingService();


        buildingService.welcomeMessage(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.send).toBeCalledWith(WELCOME_MESSAGE);

    });

    test.todo('foobar');

});
