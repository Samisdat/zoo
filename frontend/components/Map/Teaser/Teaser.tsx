import React, {useEffect} from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

import SwipeableViews from 'react-swipeable-views';
import {Animal} from "strapi-api/entity/animal/animal";
import {RoutingInterface, useMap} from "../Context/MapContext";
import {Icon} from "../../Icon/Icon";
import {Photo} from "../../../strapi-api/entity/photo/photo";
import {FocalPointImage} from "../../FocalPoint/Image";
import {styled} from "@mui/material/styles";

const MapTeaser = styled(Card)(({ theme }) => ({
    display: 'flex',
    position: 'absolute',
    bottom:90,
    left: theme.spacing(2),
    right: theme.spacing(2  ),
    flexDirection: 'row',
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

export const Teaser = () => {

    const {
        state: {teaser},
        dispatch
    } = useMap()

    const [visible, setVisible] = React.useState<boolean>(false);

    const [activeStep, setActiveStep] = React.useState(0);

    const handleClose = () => {
        setActiveStep(0)
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

        handleClose();

    };

    useEffect(() => {

        if(undefined === teaser){

            setActiveStep(0);
            setVisible(false);
            return;

        }

        console.log(teaser?.title)

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
            const photo = animal.photos[0];
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
        const photo = teaser.photos[0];
        const href = `/anlagen/${teaser.slug}`;

        teaserItems.push({
            slug,
            title,
            photo,
            href,
        });
    }

    let maxSteps = teaserItems.length;

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
                    {teaserItems.map((teaserItem:TeaserItem, index) => (
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
                    href={teaserItems[activeStep].href}
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
                    onClick={handleClose}
                >
                    Schließen
                </Button>
            </CardActions>
            </StepperRoot>
        </MapTeaser>

        );
}