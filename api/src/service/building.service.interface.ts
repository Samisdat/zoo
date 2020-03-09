import { Request, Response } from 'express';

export interface BuildingServiceInterface {

    welcomeMessage(req: Request, res: Response): void;

    getAllBuildings(req: Request, res: Response): void;

    addNewBuilding(req: Request, res: Response): void;
/*
    deleteBuilding(req: Request, res: Response): void;

    updateBuilding(req: Request, res: Response): void;
*/
}
