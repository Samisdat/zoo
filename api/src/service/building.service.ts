import { MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import {WELCOME_MESSAGE} from "../constants";
import {Building} from "../model/building";
import {BuildingServiceInterface} from "./building.service.interface";

export class BuildingService implements BuildingServiceInterface {
    public async welcomeMessage(req: Request, res: Response) {
        res.status(200);
        res.json({message: WELCOME_MESSAGE});
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

    public async deleteBuilding(req: Request, res: Response) {
        const buildingID = req.params.id;
        await Building.findByIdAndDelete(buildingID, (error: Error, deleted: any) => {
            if (error) {
                res.send(error);
            }
            const message = deleted ? 'Deleted successfully' : 'building not found :(';
            res.status(200);
            res.json({message: message});
        });
    }

    public async updateBuilding(req: Request, res: Response) {
        const buildingId = req.params.id;
        await Building.findByIdAndUpdate(
            buildingId,
            req.body,
            (error: Error, building: any) => {
                if (error) {
                    res.send(error);
                }
                const message = building
                    ? 'Updated successfully'
                    : 'building not found :(';
                res.json({message: message});
            }
        );
    }
}
