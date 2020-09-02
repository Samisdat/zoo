import { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import fs from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const {
        query: { type },
    } = req


    const geojson = path.resolve(process.env.PWD + '/pages/api/geojson', `${type}.geojson`);

    return new Promise((resolve, reject) => {

        fs.stat(geojson, function(err, stats) {

            if(err){
                res.status(400).json({
                    msg: err.message
                });

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