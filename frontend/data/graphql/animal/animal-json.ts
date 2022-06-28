import {IucnStatus} from './iucnStatus';
import {IconName} from '../../../components/Icon/IconNames';


export interface AnimalProfileStrapi{
    icon: IconName;
    label: string;
    value: string;

}
export interface AnimalJson {
    id: number;
    title: string;
    slug: string;
    wikidata: string;
    wikipediaLink: string;
    scientificName: string;
    iucnID: string;
    iucnLink: string;
    iucnStatus: IucnStatus | null;
    body: string;
    /* classname is empty|null by accident ;)*/
    className: string | null;
    order: string;
    species: string;
    family: string;
    profile:AnimalProfileStrapi[];
    individual_animals: number[];
    facilities: number[];
    photos: number[];
    headerImage: number | null;
}