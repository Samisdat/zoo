import React, {MouseEventHandler, useEffect} from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

import SwipeableViews from 'react-swipeable-views';
import {RoutingInterface, useMap} from '../Context/MapContext';
import {Icon} from '../../Icon/Icon';
import {FocalPointImage} from '../../FocalPoint/Image';
import {styled} from '@mui/material/styles';
import {Photo} from '../../../data/graphql/photo/photo';
import {Animal} from '../../../data/graphql/animal/animal';
import Container from '@mui/material/Container';
import {Paper} from '@mui/material';

const Foo = styled(Container)(({ theme }) => {

    return {
        position:'absolute',
        bottom:90,
        left:'50%',
        transform: 'translate(-50%, 0%)',
        [theme.breakpoints.up('sm')]: {
            bottom:10,
        }
    };

});


const MapTeaser = styled(Card)(({ theme }) => ({
    /*
    display: 'flex',
    position: 'absolute',
    bottom:90,
    left: theme.spacing(2),
    right: theme.spacing(2  ),
    flexDirection: 'row',
     */
}));

const StepperRoot = styled('div')(({ theme }) => ({
    width: '100%',
}));

const Step = styled('div')(({ theme }) => ({
    position: 'relative',
    height: 150,
    display: 'block',
    maxWidth: 400,
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

export interface TeaserItem{
    slug: string;
    title: string;
    photo: Photo;
    href: string;
}

export interface TeaserProps{
    items: TeaserItem[];
    handleRoute: MouseEventHandler;
    handleClose: MouseEventHandler;
}

export const Teaser = ({items, handleRoute, handleClose}:TeaserProps) => {

    console.log(JSON.stringify(items, null, 4))

    const [activeStep, setActiveStep] = React.useState(0);

    const maxSteps = items.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const _handleClose = (evt)=>{

        setActiveStep(0)
        handleClose(evt);

    }

    return (
        <Foo
            maxWidth='xs'
        >
            <MapTeaser
                id='map-teaser'
                elevation={2}
            >
                <StepperRoot>
                    <SwipeableViews
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {items.map((teaserItem:TeaserItem, index) => (
                            <Step key={teaserItem.slug}>
                                {
                                    Math.abs(activeStep - index) <= 2 ? (
                                        <React.Fragment>
                                            <Title>{teaserItem.title}</Title>
                                            <FocalPointImage
                                                photo={teaserItem.photo}
                                                width={400}
                                                height={175}
                                                point={teaserItem.photo.focalPoint}
                                            />
                                        </React.Fragment>
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

                    <CardActions disableSpacing>
                        <Button
                            startIcon={<Icon
                                icon={'chevron_right'}
                                size={'lg'}
                            />}
                            href={items[activeStep].href}
                        >
                            Details
                        </Button>
                        <Button
                            startIcon={<Icon
                                icon={'directions'}
                                size={'lg'}
                            />}
                            onClick={handleRoute}
                        >
                            Hierhin
                        </Button>
                        <Button
                            startIcon={
                                <Icon
                                    icon={'close'}
                                    size={'lg'}
                                />
                            }
                            onClick={_handleClose}
                        >
                            Schließen
                        </Button>
                    </CardActions>
                </StepperRoot>
            </MapTeaser>
        </Foo>
    );
}