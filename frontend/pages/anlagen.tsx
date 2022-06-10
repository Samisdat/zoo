import React from 'react';
import ListItem from '@mui/material/ListItem';
import {facilityUrlPart} from '../constants';
import {NavigationList} from 'components/NavigationList/NavigationList';
import {groupByFirstLetter} from 'components/NavigationList/groupByFirstLetter';
import {getImagePath} from '../helper/getImagePath';
import {NavigationListItemInterface} from 'components/NavigationList/NavigationListInterfaces';
import {BreadcrumbLink} from '../components/Navigation/Breadcrumb';
import Page from '../components/Page/Page';
import {fetchFacilities} from "../data/graphql/facilities";
import {Warehouse} from "../data/warehouse/warehouse";

export const ListItemLink = (props)  => {
    return <ListItem button component="a" {...props} />;
}

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/anlagen',
            title: 'Anlagen',
            icon: 'building',
        }
    ];

    const facilities = Warehouse.get().getFacilities();

    const listItems:NavigationListItemInterface[] = facilities.map((facilitiy):NavigationListItemInterface=>{

        const item:NavigationListItemInterface = {
            key: facilitiy.slug,
            text: facilitiy.title,
            href:`/${facilityUrlPart}/${facilitiy.slug}`,
        };

        let image:string = undefined;

        if(0 !== facilitiy.photos.length && undefined !== facilitiy.photos[0] && facilitiy.photos[0].thumbnail){
            image = getImagePath(facilitiy.photos[0].thumbnail.src);
        }

        if(undefined === image){

            if(facilitiy.headerImage && facilitiy.headerImage.thumbnail){

                image = getImagePath(facilitiy.headerImage.thumbnail.src);

            }

        }

        if(undefined === image){

            const animalWithImage = facilitiy.animals.find((animal)=>{

                return (animal.headerImage);

            });

            if(undefined !== animalWithImage){

                if(animalWithImage.headerImage && animalWithImage.headerImage.thumbnail){

                    image = getImagePath(animalWithImage.headerImage.thumbnail.src);

                }

            }

        }

        if(undefined !== image){
            item.image = image;
        }

        return item;

    });

    const listGroups = groupByFirstLetter('facilities', listItems);

    return (
        <Page
            headerImage={undefined}
            breadcrumb={breadcrumbLinks}
        >
            <NavigationList
                groups={listGroups}
            />
        </Page>
  );

}

export async function getStaticProps({ params, preview = false, previewData }) {

    await fetchFacilities();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }
}