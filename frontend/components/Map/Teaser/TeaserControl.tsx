import React, {useEffect} from 'react';

import Card from '@mui/material/Card';
import {RoutingInterface, useMap} from '../Context/MapContext';
import {styled} from '@mui/material/styles';
import {Photo} from '../../../data/graphql/photo/photo';
import {Animal} from '../../../data/graphql/animal/animal';
import {Teaser, TeaserItem} from './Teaser';

export const TeaserControl = () => {

    const {
        state: {teaser},
        dispatch
    } = useMap()

    const [visible, setVisible] = React.useState<boolean>(false);

    const handleClose = (evt) => {

        setVisible(false);

        dispatch({
            type: 'SET_TEASER',
            teaser: undefined
        });

    };

    const handleRoute = () => {

        const destination:number[] = teaser.nodes.map((node)=>{
            return (node.id as number);
        });

        const routing: RoutingInterface = {
            type: 'request',
            destination,
        }

        dispatch({
            type: 'REQUEST_ROUTING',
            routing
        });

        handleClose(undefined);

    };

    useEffect(() => {

        if(undefined === teaser){

            setVisible(false);
            return;

        }

        const nextVisible = (undefined !== teaser);

        console.log('teaser', teaser, nextVisible)

        setVisible(nextVisible);

    }, [teaser]);

    if (false === visible) {
        return (
            <React.Fragment></React.Fragment>
        );
    }

    let teaserItems:TeaserItem[] = [];

    if('enclosure' === teaser.type){

        teaserItems = teaser.animals.map((animal:Animal)=>{

            const slug = `animal-${animal.slug}`;
            const title = animal.title;
            const photo = animal.headerImage;
            const href = `/tiere/${animal.slug}`;

            return {
                slug,
                title,
                photo,
                href
            }

        });

    }
    else{

        const slug = `facility-${teaser.slug}`;
        const title = teaser.title;
        const photo = teaser.headerImage;
        const href = `/anlagen/${teaser.slug}`;

        teaserItems.push({
            slug,
            title,
            photo,
            href,
        });
    }

    return (
        <Teaser
            items={teaserItems}
            handleRoute={handleRoute}
            handleClose={handleClose}
        />
    );
}