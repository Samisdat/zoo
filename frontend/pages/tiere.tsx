import React from 'react';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {FilteredNavigationList} from 'components/Animals/Filter/FilteredNavigationList';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Page from '../components/Page/Page';
import {fetchAnimals} from "../graphql/animals";

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