import React from 'react';
import {FilteredNavigationList} from 'components/Animals/Filter/FilteredNavigationList';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Page from '../components/Page/Page';
import {Warehouse} from "../data/warehouse/warehouse";
import {fetchAnimals} from "../data/graphql/animals";

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
        <Page
            headerImage={undefined}
            breadcrumb={breadcrumbLinks}
        >

            <h1>Tiere</h1>
            <FilteredNavigationList
                animals={animals}
            />
        </Page>
    );

}

export async function getStaticProps({ params, preview = false, previewData }) {

    await fetchAnimals();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}