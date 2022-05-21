import {apolloClient} from "./apolloClient";
import {addToWarehouse} from "./add-to-warehouse";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getIndividualAnimalBySlug} from "./individual-animal/grahpql";
import {individualAnimalMapData} from "./individual-animal/individual-animal-map-data";
import {IndividualAnimal} from "./individual-animal/individual-animal";

export const fetchIndividualAnimalBySlug = async (slug: string):Promise<IndividualAnimal> => {

    const graphResult = await apolloClient.query({
        query: getIndividualAnimalBySlug,
        variables:{slug}
    });

    const datum = graphResult.data.individualAnimals.data[0];

    const individualAnimal = individualAnimalMapData(datum);

    addToWarehouse(individualAnimal);



    return Warehouse.get().getIndividualAnimal(
        parseInt(datum.id,10)
    );

};
