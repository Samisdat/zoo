import { MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import {WELCOME_MESSAGE} from "../constants";
import {Building} from "../model/building";
import {BuildingServiceInterface} from "./building.service.interface";

export class BuildingService implements BuildingServiceInterface {
    public welcomeMessage(req: Request, res: Response) {
        res.status(200).send(WELCOME_MESSAGE);
    }

    public getAllPokemon(req: Request, res: Response) {
        Building.find({}, (error: Error, pokemon: MongooseDocument) => {
            if (error) {
                res.send(error);
            }
            res.json(pokemon);
        });
    }

    public addNewPokemon(req: Request, res: Response) {
        const newPokemon = new Building(req.body);
        newPokemon.save((error: Error, pokemon: MongooseDocument) => {
            if (error) {
                res.send(error);
            }
            res.json(pokemon);
        });
    }

    public deletePokemon(req: Request, res: Response) {
        const pokemonID = req.params.id;
        Building.findByIdAndDelete(pokemonID, (error: Error, deleted: any) => {
            if (error) {
                res.send(error);
            }
            const message = deleted ? 'Deleted successfully' : 'Pokemon not found :(';
            res.status(200).send(message);
        });
    }

    public updatePokemon(req: Request, res: Response) {
        const pokemonId = req.params.id;
        Building.findByIdAndUpdate(
            pokemonId,
            req.body,
            (error: Error, pokemon: any) => {
                if (error) {
                    res.send(error);
                }
                const message = pokemon
                    ? 'Updated successfully'
                    : 'Pokemon not found :(';
                res.send(message);
            }
        );
    }
}
