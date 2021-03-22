import { NextApiRequest, NextApiResponse } from 'next'

import {listEnclosures} from "../../data-repos/enclosures";
import {Enclosures} from "../../data-repos/enclosures.interface";

export default async (req: NextApiRequest, res: NextApiResponse<Enclosures[]>) => {

    const enclosures = await listEnclosures();

    res.status(200).json(enclosures);

}