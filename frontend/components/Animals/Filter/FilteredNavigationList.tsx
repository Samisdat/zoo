import React from 'react';
import {Animal} from "../../../strapi-api/entity/animal/animal";
import AnimalFilters from "./Filters";
import {AnimalsIucnFilter} from "./Iucn/IucnFilter";
import {NavigationList} from "../../NavigationList/NavigationList";
import {NavigationListItemInterface} from "../../NavigationList/NavigationListInterfaces";
import {animalUrlPart} from "../../../constants";
import {groupByFirstLetter} from "../../NavigationList/groupByFirstLetter";
import {getIucnCounted} from "./Iucn/getIucnCounted";
import {getTaxonomyCounted} from "./Taxonomy/getTaxonomyCounted";
import {AnimalsTaxonomyFilter} from "./Taxonomy/TaxonomyFilter";
import {getImagePath} from "../../../helper/getImagePath";


export interface AnimalFilter{
    key:string,
    value:string;
}

export interface FilteredNavigationListProps{
    animals:Animal[];
}

export const FilteredNavigationList = (props:FilteredNavigationListProps) => {

    const animals = props.animals;

    const [filters, setFilters] = React.useState<AnimalFilter[]>([]);

    const filteredAnimals = animals.filter((animal)=>{

        if(0 === filters.length){
            return true;
        }

        let hit:boolean[] = filters.map((filterCriteria)=>{

            return (filterCriteria.value === animal[filterCriteria.key]);

        });

        return (false === hit.includes(false));

    });

    const listItems:NavigationListItemInterface[] = filteredAnimals
        .map((animal):NavigationListItemInterface=>{

            const item:NavigationListItemInterface = {
                key: animal.slug,
                text: `${animal.title} ${animal.iucnStatus}`,
                href:`/${animalUrlPart}/${animal.slug}`,
            };

            let image:string = undefined;

            if(0 !== animal.photos.length && undefined !== animal.photos[0] && animal.photos[0].thumbnail){
                image = getImagePath(animal.photos[0].thumbnail.src);
            }

            if(undefined !== image){
                item.image = image;
            }

            return item;

        });

    const iucnCounted = getIucnCounted(animals);

    const taxonomyCounted = getTaxonomyCounted(animals);

    const listGroups = groupByFirstLetter('facilities', listItems);


    return (
        <React.Fragment>
            {/*
            <AnimalFilters/>
            */}
            <AnimalsIucnFilter
                iucnCounted={iucnCounted}
                filters={filters}
                setFilters={setFilters}
            />
            <AnimalsTaxonomyFilter
                taxonomyCounted={taxonomyCounted}
                filters={filters}
                setFilters={setFilters}
            />

            <NavigationList
                groups={listGroups}
            />
        </React.Fragment>
    );
}
