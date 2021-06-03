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


export interface FilterCriteria{
    key:string,
    value:string;
}

export interface FilteredNavigationListProps{
    animals:Animal[];
}

export const FilteredNavigationList = (props:FilteredNavigationListProps) => {

    const animals = props.animals;

    const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria[]>([]);

    const filteredAnimals = animals.filter((animal)=>{

        if(0 === filterCriteria.length){
            return true;
        }

        let hit:boolean[] = filterCriteria.map((filterCriteria)=>{

            if('className' === filterCriteria.key){
                return (filterCriteria.value === animal.taxonomy.className);
            }

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
                image = `http://127.0.0.1:1337${animal.photos[0].thumbnail.src}`
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
                filterCriteria={filterCriteria}
                setFilterCriteria={setFilterCriteria}
            />
            <AnimalsTaxonomyFilter
                taxonomyCounted={taxonomyCounted}
                filterCriteria={filterCriteria}
                setFilterCriteria={setFilterCriteria}
            />

            <NavigationList
                groups={listGroups}
            />
        </React.Fragment>
    );
}
