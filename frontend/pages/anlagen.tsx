import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {facilityUrlPart} from "../constants";
import {getFacilities} from "../strapi-api/query/facilities";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {PinnedSubheaderList, PinnedSubheaderListItemProps} from "../components/PinnedSubheaderList/PinnedSubheaderList";
import {groupByFirstLetter} from "../components/PinnedSubheaderList/groupByFirstLetter";

export const ListItemLink = (props)  => {
    return <ListItem button component="a" {...props} />;
}

export default function Index(props) {

    Warehouse.get().hydrate(props.warehouse);

    const facilities = Warehouse.get().getFacilities();

    const listItems:PinnedSubheaderListItemProps[] = facilities.map((facilitiy):PinnedSubheaderListItemProps=>{

        const item:PinnedSubheaderListItemProps = {
            key: facilitiy.slug,
            text: facilitiy.title,
            href:`/${facilityUrlPart}/${facilitiy.slug}`,
        };

        let image:string = undefined;

        if(0 !== facilitiy.photos.length && undefined !== facilitiy.photos[0] && facilitiy.photos[0].thumbnail){
            image = `http://127.0.0.1:1337${facilitiy.photos[0].thumbnail.src}`
        }

        if(undefined === image){

            const animalWithImage = facilitiy.animals.find((animal)=>{
                return (0 < animal.photos.length);
            });

            if(undefined !== animalWithImage){

                if(0 !== animalWithImage.photos.length && undefined !== animalWithImage.photos[0] && animalWithImage.photos[0].thumbnail){
                    image = `http://127.0.0.1:1337${animalWithImage.photos[0].thumbnail.src}`
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
        <PinnedSubheaderList
            groups={listGroups}
        />
  );

}

export async function getStaticProps({ params, preview = false, previewData }) {

    await getFacilities();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }
}