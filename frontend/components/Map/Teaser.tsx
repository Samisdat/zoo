import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import {useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import CloseIcon from '@material-ui/icons/Close';
import DirectionsIcon from '@material-ui/icons/Directions';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {Animal} from "../../strapi-api/entity/animal/animal";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mapTeaser: {
            display: 'flex',
            position: 'absolute'    ,
            bottom:90,
            left: theme.spacing(2),
            right: theme.spacing(2  ),
            flexDirection: 'row',
        },
        progress:{

        },
        text: {
            flex: 1
        },
        image: {
            width: 150,
            height: 150,
        },
        modal: {
            paddingLeft: 50,
        },
        stepperRoot: {
            width: '100%',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: theme.spacing(2),
            backgroundColor: theme.palette.background.default,
        },
        img: {
            height: 150,
            display: 'block',
            maxWidth: 400,
            overflow: 'hidden',
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
        },
        step:{
            position: 'relative',
            height: 150,
            display: 'block',
            maxWidth: 400,
            overflow: 'hidden',
            width: '100%',
        },
        title:{
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

        }
    }),
);

export interface TeaserPropsInterface {
    mapElement: MapElement,
    close: Function;
}

export interface TeaserItem{
    slug: string;
    title: string;
    photo: string;
    href: string;
}

export const Teaser = (props: TeaserPropsInterface) => {

    const classes = useStyles();

    const visible = (undefined === props.mapElement)? false : true;

    const [activeStep, setActiveStep] = React.useState(0);

    const handleClose = () => {
        setActiveStep(0)
        props.close();
    };

    if (false === visible) {
        return (
            <React.Fragment></React.Fragment>
        );
    }

    let teaserItems:TeaserItem[] = [];

    if('enclosure' === props.mapElement.facility.type){

        teaserItems = props.mapElement.facility.animals.map((animal:Animal)=>{

            const slug = `animal-${animal.slug}`;
            const title = animal.title;
            const photo = animal.photos[0].medium.src;
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

        const slug = `facility-${props.mapElement.facility.slug}`;
        const title = props.mapElement.facility.title;
        const photo = props.mapElement.facility.photos[0].medium.src;
        const href = `/anlagen/${props.mapElement.facility.slug}`;

        teaserItems.push({
            slug,
            title,
            photo,
            href
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
        <Card
            id='map-teaser'
            className={classes.mapTeaser}
            elevation={2}
        >
            <div className={classes.stepperRoot}>
                <SwipeableViews
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {teaserItems.map((teaserItem:TeaserItem, index) => (
                        <div className={classes.step} key={teaserItem.slug}>
                            {
                                Math.abs(activeStep - index) <= 2 ? (
                                    <React.Fragment>
                                        <h1 className={classes.title}>{teaserItem.title}</h1>
                                        <div
                                            className={classes.img}
                                            style={{
                                                backgroundImage: 'url("http://127.0.0.1:1337' + teaserItem.photo + '")'
                                            }}
                                        />
                                    </React.Fragment>
                            ) : null}
                        </div>
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
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        }
                    />
                }

            <CardActions disableSpacing>
                <Button
                    startIcon={<KeyboardArrowRight />}
                    href={teaserItems[activeStep].href}
                >
                    Details
                </Button>
                <Button
                    startIcon={<DirectionsIcon />}
                >
                    Hierhin
                </Button>
                <Button
                    startIcon={<CloseIcon />}
                    onClick={handleClose}
                >
                    Schließen
                </Button>
            </CardActions>
            </div>
        </Card>

        );
}