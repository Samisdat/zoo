import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            position: 'absolute'    ,
            bottom:90,
            left: theme.spacing(1),
            right: theme.spacing(1),
            flexDirection: 'row',
            height: 150
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
    }),
);

export interface TeaserPropsInterface {
    apiUrl: string;
    close: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TeaserStateInterface {
    href: string;
    title: string;
    subLine?: string;
    image: string;
    close: React.MouseEventHandler<HTMLButtonElement>;
}

const teaserService = async (apiUrl, close):Promise<TeaserStateInterface> => {

    const promise = new Promise<TeaserStateInterface>((resolve, reject) => {

        setTimeout(()=>{

            const state:TeaserStateInterface = {
                image: "/images/elefant.jpg",
                title: "Live From Space",
                subLine: 'Mac Miller',
                href: '/foo/bar',
                close
            };

            resolve(state)

        },750);

    });

    return promise

}
/*
*/

//const loadingContent =

export const Teaser = (props: TeaserPropsInterface) => {

    const classes = useStyles();

    const visible = (undefined === props.apiUrl) ? false: true;
    console.log('visible', visible)

    const [loading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<TeaserStateInterface>(undefined);

    useEffect(() => {

        if(undefined === props.apiUrl){
            return;
        }

        teaserService(props.apiUrl, props.close)
            .then((data) =>{
                setData(data);
                setLoading(false);
            });

    }, [props.apiUrl])


    if (false === visible) {
        return (
            <React.Fragment></React.Fragment>
        );
    }

    if (true === loading) {

        return (
            <Card
                className={classes.root}
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

    return (
        <Card
            className={classes.root}
            elevation={2}
        >
            <div className={classes.text}>
                <CardContent>

                    <Typography component="h6" variant="h6">
                        {data?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {data?.subLine}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        href={data?.href}
                    >
                        Details
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={data?.close}
                    >
                        Schließen
                    </Button>
                </CardActions>
            </div>
            <CardMedia
                className={classes.image}
                image={data?.image}
                title={data?.title}
            />
        </Card>
    );
}
