import React from 'react';
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getAnimals} from "../strapi-api/query/animals";
import {FilteredNavigationList} from "../components/Animals/Filter/FilteredNavigationList";

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);

    const animals = Warehouse.get().getAnimals();

    return (
        <React.Fragment>

            <h1>Tiere</h1>
            <FilteredNavigationList
                animals={animals}
            />
        </React.Fragment>
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