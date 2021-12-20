import {PhotoStrapi} from "../photo/photo-strapi";
import {IndividualAnimalStrapi} from "../individual-animal/individual-animal-strapi-interface";
import {FacilityStrapi} from "../facility/facility-strapi";
import {IconName} from "../../../components/Icon/IconNames";

export interface AnimalProfileStrapi{
    icon: IconName;
    label: string;
    value: string;

}

export interface AnimalStrapi {
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
    family: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    profile: AnimalProfileStrapi[];
    individual_animals: IndividualAnimalStrapi[];
    facilities: FacilityStrapi[];
    photos: PhotoStrapi[];
}
