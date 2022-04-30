import {apolloClient} from "./apolloClient";

import {getAnimalBySlug, getAnimals} from "./animal/grahpql";
import {addToWarehouse} from "./add-to-warehouse";
import {animalMapData} from "./animal/animal-map-data";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Animal} from "./animal/animal";

export const fetchAnimalBySlug = async (slug: string):Promise<Animal> => {

    const graphResult = await apolloClient.query({
        query: getAnimalBySlug,
        variables:{slug}
    });

    const datum = graphResult.data.animals.data[0];

    const animal = animalMapData(datum);

    addToWarehouse(animal);

    return Warehouse.get().getAnimal(
        parseInt(datum.id,10)
    );

};

export const fetchAnimals = async ():Promise<Animal[]> => {

    const graphResult = await apolloClient.query({
        query: getAnimals
    });

    const data = graphResult.data.animals.data;

    let animals = data.map((datum:any)=>{

        const animal = animalMapData(datum);

        addToWarehouse(animal);

        return Warehouse.get().getAnimal(
            parseInt(datum.id,10)
        );

    });

    return animals;

}