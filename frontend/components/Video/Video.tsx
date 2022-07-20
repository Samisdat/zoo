/*
import ReactPlayer from "react-player";
import Grid from "@mui/material/Grid";
import React from "react";

<div suppressHydrationWarning={true}>
    { process.browser &&
    }
    <div>some other component</div>
</div>

*/
import React, {useEffect, useState} from 'react';
import {Facility} from "../../data/graphql/facility/facility";
import ReactPlayer from "react-player";
import {getImagePath} from "../../helper/getImagePath";

export interface VideoProps{
    url:string;
}

export const Video = ({url}:VideoProps)    => {

    const [frontend, setFrontend] = useState<boolean>(false);

    useEffect(() => {

        setFrontend(true);

    });

    const video = () => {

        if(frontend){
            return (
                <ReactPlayer
                    className='react-player'
                    url={getImagePath('/uploads/Hirscheber_Yala_Kedua_8d0a1a877c.mp4')}
                    width='100%'
                    height='100%'
                    controls={true}
                />
            );
        }

        return 'hold';

    }

    return (

        <>
            {video()}
            Ein Video
        </>
    );

}
