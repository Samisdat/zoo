import React, {useEffect} from "react";
import {useMap} from "../Context/MapContext";
import {Facility} from "strapi-api/entity/facility/facility";

interface OpenTeaserByFragmentProps{
    facilities: Facility[];
}

export const OpenTeaserByFragment = ({facilities}:OpenTeaserByFragmentProps) => {

    const { dispatch } = useMap()

    const resolveSlug = (slug:string) =>{

        const resolved = facilities.find((facility)=>{

            return (slug === facility.slug)

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
