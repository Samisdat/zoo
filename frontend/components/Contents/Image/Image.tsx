import React from 'react';
import {ContentPart} from "../Contents";
import {PhotoJson, PhotoSize} from "../../../data/graphql/photo/photo-json";
import {getImagePath} from "../../../helper/getImagePath";
import {styled} from "@mui/material/styles";
import {CaptionStyled} from "../Caption";

const WrapImageStyled  = styled('div')(({ theme }) => ({
    position: 'relative',
    marginBottom: theme.spacing(1),
    width: '100%',
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
    marginBottom: theme.spacing(1),
}));

export interface ImageProps extends ContentPart{
    type: 'image',
    align: 'left' | 'right' | 'fullsize' | 'none';
    image: PhotoJson;
}

export interface WrapImageProps{
    align: 'left' | 'right' | 'fullsize' | 'none';
    children?:
        | string
        | React.ReactElement
        | React.ReactElement[];
}

export const WrapImage = ({align, children}: WrapImageProps)=> {

    if('none' === align) {
        return (
            <>{children}</>
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

    return (
        <>{children}</>
    );

};

export const Image = ({image, align, type}:ImageProps) => {

    console.log(type);

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
                width={useImage.width}
                height={useImage.height}
            />
            <CaptionStyled>
                {image.caption} {image.copyright}
            </CaptionStyled>
        </WrapImage>
    );
}

Image.defaultProps = {
    type: 'image'
};