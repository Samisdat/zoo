import { NextApiRequest, NextApiResponse } from 'next'

import {Animal} from "../../data-repos/aninals.interface";
import {list} from "../../data-repos/aninals";

export default async (req: NextApiRequest, res: NextApiResponse<Animal[]>) => {

    const animals = await list();

    console.log(animals)

    res.status(200).json(animals);

}