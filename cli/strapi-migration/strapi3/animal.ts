import {getUrl_3} from "./get-url";
import axios from "axios";

export interface Animal_3{
    id: number;
    title: string;
    slug: string;
    wikidata: string;
    wikipediaLink: string;
    scientificName: string;
    iucnID: string;
    iucnLink: string;
    iucnStatus: string;
    body: string;
    className: string;
    order: string;
    species: string;
    title_en: string;
    title_nl: string;
    title_de: string;
    raw_facility: string;
    family: string;
    raw_published: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    profile: any;
    individual_animals: any,
    facilities: any,
    photos: any,
    posts: any,
    qr_codes: any
}

export const getAnimals_3 = async ():Promise<Animal_3[]> => {

    const url = getUrl_3(`/animals/?_limit=-1`);

    const response = await axios.get(
        url
    );

    return (response.data as Animal_3[]);

}
