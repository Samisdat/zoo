import React, {useEffect} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import {useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {Animal} from "../../strapi-api/entity/animal/animal";
import {RoutingInterface, useMap} from "./Context/MapContext";
import {useViewport} from "../viewport/useViewport";
import {set} from "timm";
import {getImagePath} from "../../helper/getImagePath";
import {Icon} from "../Icon/Icon";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mapTeaser: {
            display: 'flex',
            position: 'absolute',
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

export interface TeaserItem{
    slug: string;
    title: string;
    photo: string;
    href: string;
}

export const Teaser = () => {

    const {
        state: {teaser},
        dispatch
    } = useMap()

    const classes = useStyles();

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

        const destination:number[] = teaser.facility.nodes.map((node)=>{
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

    };

    useEffect(() => {

        if(undefined === teaser){

            setActiveStep(0);
            setVisible(false);
            return;

        }

        console.log(teaser?.facility?.title)

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

    if('enclosure' === teaser.facility.type){

        teaserItems = teaser.facility.animals.map((animal:Animal)=>{

            const slug = `animal-${animal.slug}`;
            const title = animal.title;
            const photo = getImagePath(animal.photos[0].medium.src);
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

        const slug = `facility-${teaser.facility.slug}`;
        const title = teaser.facility.title;
        const photo = getImagePath(teaser.facility.photos[0].medium.src);
        const href = `/anlagen/${teaser.facility.slug}`;

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
                                                backgroundImage: 'url("' + teaserItem.photo + '")'
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
            </div>
        </Card>

        );
}