import { NextApiRequest, NextApiResponse } from 'next'

import * as path from 'path';
import * as fs from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const {
        query: { type },
    } = req


    const geojson = path.resolve(process.env.PWD + '/pages/api/geojson', `${type}.geojson`);

    return new Promise((resolve, reject) => {

        fs.stat(geojson, function(err:NodeJS.ErrnoException) {

            if(err){

                const errorReponse:any[] = [
                    err.message
                ];

                res.status(400).json(errorReponse);

                reject(err.message);
            }
            else{

                res.setHeader("content-type", "application/json");
                fs.createReadStream(geojson).pipe(res);
                resolve();
            }


        });

    });


}