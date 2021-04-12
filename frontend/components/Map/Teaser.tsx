import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {CardHeader, CircularProgress} from "@material-ui/core";

import {useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import CloseIcon from '@material-ui/icons/Close';
import DirectionsIcon from '@material-ui/icons/Directions';
import {relative} from "jest-haste-map/build/lib/fast_path";

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

const tutorialSteps = [
    {
        label: 'Schwarze Klammeraffen',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        label: 'NeONBRAND ',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];


export interface TeaserPropsInterface {
    apiUrl: string;
    close: Function;
    open:boolean;
}

export interface TeaserDetail{
    image: string;
    title: string;
    href: string;
}

export interface TeaserStateInterface{
    apiUrl:string;
    animals:TeaserDetail[]
}

const animalsService = async (apiUrl, close):Promise<TeaserStateInterface> => {

    const promise = new Promise<TeaserStateInterface>((resolve, reject) => {

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result:TeaserDetail[]) => {

                    const state:TeaserStateInterface = {
                        apiUrl: apiUrl,
                        animals: result
                    };

                    resolve(state)

                },
                (error) => {
                    console.log(error);
                }
            );

    });

    return promise

}


export const Teaser = (props: TeaserPropsInterface) => {

    const classes = useStyles();

    const visible = (undefined === props.apiUrl) ? false: true;

    const [loading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<TeaserStateInterface>(undefined);

    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {

        if(undefined === props.apiUrl){
            return;
        }

        animalsService(props.apiUrl, props.close)
            .then((data) =>{

                setActiveStep(0);
                setData(data);
                setLoading(false);
            });

    }, [props.apiUrl])

    const handleClose = () => {
        setLoading(true);
        setActiveStep(0)
        props.close();
    };

    const theme = useTheme();

    if (false === visible) {
        return (
            <React.Fragment></React.Fragment>
        );
    }

    if (true === loading) {

        return (
            <Card
                className={classes.mapTeaser}
                elevation={2}
            >
                <CircularProgress
                    size={40}
                    style={{
                        position: 'absolute',
                        left:-20,
                        top:50,
                        marginLeft: '50%',
                    }}
                />
            </Card>
        );

    }

    const maxSteps = data.animals.length;

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
                    {data.animals.map((step, index) => (
                        <div className={classes.step} key={step.href}>
                            {
                                Math.abs(activeStep - index) <= 2 ? (
                                    <React.Fragment>
                                        <h1 className={classes.title}>{step.title}</h1>
                                        <div
                                            className={classes.img}
                                            style={{
                                                backgroundImage: 'url("' + step.image + '")'
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
                    /*href={data.animals[activeStep].href}*/
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