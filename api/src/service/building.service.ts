import { MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import {WELCOME_MESSAGE} from "../constants";
import {Building} from "../model/building";
import {BuildingServiceInterface} from "./building.service.interface";

export class BuildingService implements BuildingServiceInterface {
    public welcomeMessage(req: Request, res: Response) {
        res.status(200).send(WELCOME_MESSAGE);
    }

    public async getAllBuildings(req: Request, res: Response) {
        await Building.find({}, (error: Error, building: MongooseDocument) => {
            if (error) {
                res.send(error);
            }
            res.json(building);
        });
    }

    public async addNewBuilding(req: Request, res: Response) {

        const building = new Building(req.body);


        await building.save((error: Error, building: MongooseDocument) => {
            if (error) {
                res.send(error);
            }

            res.json(building);
        });


    }
    /*
    public async deleteBuilding(req: Request, res: Response) {
        const buildingID = req.params.id;
        await Building.findByIdAndDelete(buildingID, (error: Error, deleted: any) => {
            if (error) {
                res.send(error);
            }
            const message = deleted ? 'Deleted successfully' : 'building not found :(';
            res.status(200).send(message);
        });
    }

    public updateBuilding(req: Request, res: Response) {
        const buildingId = req.params.id;
        Building.findByIdAndUpdate(
            buildingId,
            req.body,
            (error: Error, building: any) => {
                if (error) {
                    res.send(error);
                }
                const message = building
                    ? 'Updated successfully'
                    : 'building not found :(';
                res.send(message);
            }
        );
    }

     */
}
