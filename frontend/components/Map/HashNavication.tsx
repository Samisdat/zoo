import React, {useEffect} from "react";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";

interface HashNavigationProps{
    mapElements: MapElement[];
}

export const HashNavigation = ({mapElements}:HashNavigationProps) => {

    const { dispatch } = useMap()

    mapElements = mapElements.filter((mapElement:MapElement) => {

        if('box' !== mapElement.properties.type){
            return false;
        }

        if(!mapElement.properties.facility){
            return false;
        }

        if('playground' === mapElement.properties.facility.type){
            return true;
        }

        if('food' === mapElement.properties.facility.type){
            return true;
        }

        if('poi' === mapElement.properties.facility.type){
            return true;
        }

        if('enclosure' === mapElement.properties.facility.type){
            return true;
        }

        return false;

    });

    const resolveSlug = (slug:string) =>{

        const resolved = mapElements.find((mapElement)=>{

            return (slug === mapElement.facility.slug)

        });

        if(resolved){

            dispatch({
                type: 'SET_FOCUS',
                focus: resolved
            });

            dispatch({
                type: 'SET_TEASER',
                teaser: resolved
            });


        }

    }

    useEffect(()=>{

        const slug = location.hash.replace('#', '');
        resolveSlug(slug)

        window.addEventListener('hashchange', ()=>{

            const slug = location.hash.replace('#', '');

            resolveSlug(slug)

        }, false);

    },[])

    return <React.Fragment/>;

};
