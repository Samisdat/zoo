import React, {useEffect, useState} from 'react';
import {ContentPart} from "../Contents";
import ReactPlayer from "react-player";
import {styled} from "@mui/material/styles";
import {CaptionStyled} from "../Caption";

export interface YoutubeProps extends ContentPart{
    type: 'youtube',
    youtubeUrl: string;
    caption: string;
}

const AspectRatioStyled = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    height: 0,
    width: '100%',
    paddingTop: '56.25%',
    marginBottom: theme.spacing(1),
}));

const ReactPlayerStyled = styled(ReactPlayer)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left:0,
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing(3),
}));

export const Youtube = ({youtubeUrl, caption}:YoutubeProps) => {

    const [isFrontend, setIsFrontend] = useState(false);

    useEffect(()=>{
        setIsFrontend(true);
    });

    if(!isFrontend){

        return (
            <>
                <AspectRatioStyled />
                <CaptionStyled>{caption}</CaptionStyled>
            </>
        );
    }

    return (
        <>
            <AspectRatioStyled>
                <ReactPlayerStyled
                    width={'100%'}
                    height={'100%'}
                    url={youtubeUrl}
                    config={{
                        youtube: {
                            playerVars: { showinfo: 1 }
                        }
                    }}
                />

            </AspectRatioStyled>
            <CaptionStyled>{caption}</CaptionStyled>
        </>

    );

}