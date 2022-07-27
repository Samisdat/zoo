import React from 'react';
import {ContentPart} from "../Contents";
import {PhotoJson, PhotoSize} from "../../../data/graphql/photo/photo-json";
import {getImagePath} from "../../../helper/getImagePath";
import {styled} from "@mui/material/styles";
import {Tooltip} from "@mui/material";
import {Icon} from "../../Icon/Icon";

const WrapImageStyled  = styled('div')(({ theme }) => ({
    position: 'relative',
    marginBottom: theme.spacing(2),
    width: '100%'
}));

const WrapImageLeftStyled = styled(WrapImageStyled)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width:'50%',
        float: 'left',
        marginRight: theme.spacing(2),
    },
}));

const WrapImageRightStyled = styled(WrapImageStyled)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width:'50%',
        float: 'right',
        marginLeft: theme.spacing(2),
    },
}));

const ImageStyled = styled('img')(({ theme }) => ({
    width:'100%',
    height:'100%',
    display:'block',
}));

const CaptionStyled = styled('div')(({ theme }) => ({
    position:'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.7)',
    background: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontWeight: 'bold',
    fontSize:'16px',

}));

const CopyrightIconStyled = styled('span')(({ theme }) => ({
    display: 'inline-block',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
}));


export interface ImageProps extends ContentPart{
    type: 'image',
    align: 'left' | 'right' | 'fullsize' | 'none';
    image: PhotoJson;
}

export interface WrapImageProps{
    align: 'left' | 'right' | 'fullsize' | 'none';
    children: React.ReactNode;
}

export const WrapImage = ({align, children}: WrapImageProps)=> {

    if('none' === align) {
        return (
            children
        );
    }

    else if('left' === align){
        return(
            <WrapImageLeftStyled>
                {children}
            </WrapImageLeftStyled>
        );
    }

    else if('right' === align){
        return(
            <WrapImageRightStyled>
                {children}
            </WrapImageRightStyled>
        );
    }

    return (
        <WrapImageStyled>
            {children}
        </WrapImageStyled>
    );

};

export const Image = ({image, align}:ImageProps) => {

    const useImage:PhotoSize | null = image.large || image.medium || image.small;

    if(!useImage){
        return null;
    }


    return (

        <WrapImage
            align={align}
        >
            <ImageStyled
                src={getImagePath(useImage.src)}
                alt={image.alternativeText}
            />
            <CaptionStyled>
                {image.caption}
                <Tooltip title={image.copyright} arrow>
                    <CopyrightIconStyled>
                        <Icon icon={'copyright'} size={'lg'}/>
                    </CopyrightIconStyled>
                </Tooltip>
            </CaptionStyled>
        </WrapImage>
    );
}