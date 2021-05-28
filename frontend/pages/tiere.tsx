import React from 'react';
import {animalUrlPart} from "../constants";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getAnimals} from "../strapi-api/query/animals";
import {PinnedSubheaderList, PinnedSubheaderListItemProps} from "../components/PinnedSubheaderList/PinnedSubheaderList";
import {groupByFirstLetter} from "../components/PinnedSubheaderList/groupByFirstLetter";

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);

    const animals = Warehouse.get().getAnimals();

    const listItems:PinnedSubheaderListItemProps[] = animals.map((animals):PinnedSubheaderListItemProps=>{

        const item:PinnedSubheaderListItemProps = {
            key: animals.slug,
            text: animals.title,
            href:`/${animalUrlPart}/${animals.slug}`,
        };

        let image:string = undefined;

        if(0 !== animals.photos.length && undefined !== animals.photos[0] && animals.photos[0].thumbnail){
            image = `http://127.0.0.1:1337${animals.photos[0].thumbnail.src}`
        }

        if(undefined !== image){
            item.image = image;
        }

        return item;

    });

    const listGroups = groupByFirstLetter('facilities', listItems);

    return (
        <PinnedSubheaderList
            groups={listGroups}
        />
    );

}

export async function getStaticProps({ params, preview = false, previewData }) {

    await getAnimals();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }
}