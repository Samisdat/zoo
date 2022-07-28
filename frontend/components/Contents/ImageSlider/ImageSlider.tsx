import React from 'react';
import {ContentPart} from "../Contents";
import {PhotoJson} from "../../../data/graphql/photo/photo-json";
import {Image, WrapImage} from "../Image/Image";
import {FocalPointImage} from "../../FocalPoint/Image";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import {Icon} from "../../Icon/Icon";
import CardActions from "@mui/material/CardActions";
import {TeaserItem} from "../../Map/Teaser/Teaser";
import SwipeableViews from 'react-swipeable-views';
import {styled} from "@mui/material/styles";
import {Photo} from "../../../data/graphql/photo/photo";

export interface ImageSliderProps extends ContentPart{
    type: 'imageSlider',
    images: PhotoJson[];
}

const Step = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'block',
    overflow: 'hidden',
    width: '100%',
}));

const Title = styled('h1')(({ theme }) => ({
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
    fontSize:'16px',
}));

const ImageStyled = styled('img')(({ theme }) => ({
    width:'100%',
    height:'100%',
    display:'block',
}));

export const ImageSlider = ({images}:ImageSliderProps) => {

    const [activeStep, setActiveStep] = React.useState(0);

    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <WrapImage
            align={"fullsize"}
        >


                <SwipeableViews
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((image:PhotoJson, index) => (
                        <Step key={index}>
                            {
                                Math.abs(activeStep - index) <= 2 ? (
                                    <Image
                                        type={'image'}
                                        image={image}
                                        align={'none'}
                                    />

                                ) : null}
                        </Step>
                    ))}
                </SwipeableViews>

                {maxSteps > 1 &&
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="dots"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            <Icon
                                icon={'chevron_right'}
                                size={'lg'}
                            />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            <Icon
                                icon={'chevron_left'}
                                size={'lg'}
                            />
                            Back
                        </Button>
                    }
                />
                }


        </WrapImage>

    );
}