import React from 'react';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {getAnimals} from 'strapi-api/query/animals';
import {FilteredNavigationList} from 'components/Animals/Filter/FilteredNavigationList';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import Page from '../components/Page/Page';

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

    await getAnimals();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}