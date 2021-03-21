import {NextApiRequest, NextApiResponse} from "next";
import {
    generateXmlContainingType,
    getGeojsonFromSvg,
    getSvg,
    writeGeojsonContainingType
} from "../../../../data-repos/geojson-from-svg";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    let {
        query: {slug},
    } = req;

    if('string' !== typeof slug){
        res.status(400).json({
            error: `slug is not a string and therefore not supported`
        });

    }

    slug = slug as string;

    const xml = getSvg();

    const dataSvg = generateXmlContainingType(xml, slug)

    const geojson = await getGeojsonFromSvg(dataSvg, slug);

    writeGeojsonContainingType(
        geojson,
        slug
    );


    res.status(200).json(geojson);


}