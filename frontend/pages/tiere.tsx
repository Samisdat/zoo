import React from 'react';
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getAnimals} from "../strapi-api/query/animals";
import {FilteredNavigationList} from "../components/Animals/Filter/FilteredNavigationList";
import {Breadcrumb, BreadcrumbLink, BreadcrumbProps} from "../components/Navigation/Breadcrumb";

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);

    const animals = Warehouse.get().getAnimals();

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/tiere',
            title: 'Tiere',
            icon: 'pet',
        }
    ];


    return (
        <React.Fragment>
            <Breadcrumb
                links={breadcrumbLinks}
            />
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