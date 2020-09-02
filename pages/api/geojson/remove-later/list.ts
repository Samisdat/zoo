import { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import fs from 'fs';

import urlSlug from 'url-slug'

export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {

    const {
        query: { type },
    } = req

        const dataDir = path.resolve(process.env.PWD + '/pages/api/data');

        const slugs = await fs.readdirSync(dataDir).map((file)=>{
            return file.replace('.json','');
        });

        const data = slugs.map( (slug)=>{

            const json = JSON.parse(fs.readFileSync(dataDir + '/' + slug + '/data.json', {encoding: 'utf8'}));
            json.slug = slug;

            return json;
        })

        res.status(200).json(data);

    /*
        setTimeout(()=>{


            res.status(200).json({
                msg: 'top',
                slug: urlSlug('Hei there')
            });

            //fs.createReadStream(geojson).pipe(res);
            resolve();

        }, 100);
        */
        /*
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

         */

//    });


}