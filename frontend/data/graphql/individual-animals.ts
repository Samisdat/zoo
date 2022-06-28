import {apolloClient} from './apolloClient';
import {addToWarehouse} from './add-to-warehouse';
import {getIndividualAnimalBySlug, getIndividualAnimals} from './individual-animal/grahpql';
import {individualAnimalMapData} from './individual-animal/individual-animal-map-data';
import {IndividualAnimal} from './individual-animal/individual-animal';
import {Warehouse} from '../warehouse/warehouse';

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

export const fetchIndividualAnimals = async ():Promise<IndividualAnimal[]> => {

    const graphResult = await apolloClient.query({
        query: getIndividualAnimals
    });

    const data = graphResult.data.individualAnimals.data;

    const individualAnimals = data.map((datum:any)=>{

        const individualAnimal = individualAnimalMapData(datum);

        addToWarehouse(individualAnimal);

        return Warehouse.get().getIndividualAnimal(
            parseInt(datum.id,10)
        );

    });

    return individualAnimals;

}

