import axios from "axios";
import {getUrl_4} from "./get-url";
import {getHeaders} from "./get-header";
import {getStrapi4Url} from "../../strapi";
import {Facility_4} from "./facility";

const qs = require('qs');

export interface Animal_4{
    id: number;
    attributes:{
        "slug": string;
        "title": string;
        "wikidata": string;
        "wikipediaLink": string;
        "scientificName": string;
        "iucnID": string;
        "iucnLink": string;
        "iucnStatus": string;
        "body": string;
        "className": string;
        "order": string;
        "species": string;
        "family": string;
        "facilities": Facility_4[] | null;
        "createdAt": string;
        "updatedAt": string;
        "publishedAt": string;
    }
}

export const getAnimals_4 = async ():Promise<Animal_4[]> => {

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
    }, {
        encodeValuesOnly: true, // prettify url
    });


    const url = getUrl_4(`/api/animals?${query}`);

    const response = await axios.get(
        url,
        getHeaders()
    );

    return (response.data.data as Animal_4[]);

};

export const getAnimalBySlug = (slug:string, animals: Animal_4[]):Animal_4|undefined => {

    return animals.find((animal)=>{
        return (slug === animal?.attributes?.slug);
    })

}

export const updateAnimal = async (animal:Animal_4): Promise<any | undefined> => {

    const url = getStrapi4Url(`/api/animals/${animal.id}`);

    const foo:any = {
        ...animal.attributes,
    };

    const response = await axios.put(
        url,
        {
            data:foo,
            populate:'*'
        },
        getHeaders()
    );

    console.log(response.data)

    return (response.data)

}
