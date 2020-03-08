import { Application } from 'express';
import {BuildingServiceInterface} from "../service/building.service.interface";

export class Controller {

    constructor(private app: Application, private buildingService: BuildingServiceInterface) {
        this.routes();
    }

    public routes() {
        this.app.route('/').get(this.buildingService.welcomeMessage);

        this.app.route('/buildings').get(this.buildingService.getAllPokemon);

        this.app.route('/building').post(this.buildingService.addNewPokemon);

        this.app
            .route('/building/:id')
            .delete(this.buildingService.deletePokemon)
            .put(this.buildingService.updatePokemon);
    }
}
