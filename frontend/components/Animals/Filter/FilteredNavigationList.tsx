import React from 'react';
import {NavigationList} from '../../NavigationList/NavigationList';
import {NavigationListItemInterface} from '../../NavigationList/NavigationListInterfaces';
import {animalUrlPart} from '../../../constants';
import {groupByFirstLetter} from '../../NavigationList/groupByFirstLetter';
import {getIucnCounted} from './Iucn/getIucnCounted';
import {getTaxonomyCounted} from './Taxonomy/getTaxonomyCounted';
import {getImagePath} from '../../../helper/getImagePath';
import {FilterAccordion} from './FilterAccordion';
import {Animal} from "../../../graphql/animal/animal";

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

        const hit:boolean[] = filters.map((filterCriteria)=>{

            return (filterCriteria.value === animal[filterCriteria.key]);

        });

        return (false === hit.includes(false));

    });

    const listItems:NavigationListItemInterface[] = filteredAnimals
        .map((animal):NavigationListItemInterface=>{

            const item:NavigationListItemInterface = {
                key: animal.slug,
                text: animal.title,
                href:`/${animalUrlPart}/${animal.slug}`,
            };

            let image:string = undefined;

            // photos will go
            if(0 !== animal.photos.length && undefined !== animal.photos[0] && animal.photos[0].thumbnail){
                image = getImagePath(animal.photos[0].thumbnail.src);
            }

            if(undefined === image){

                if(animal.headerImage && animal.headerImage.thumbnail){

                    image = getImagePath(animal.headerImage.thumbnail.src);

                }

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

            <FilterAccordion
                iucnCounted={iucnCounted}
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
