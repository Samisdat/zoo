import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {CircularProgress} from "@material-ui/core";
import {TeaserInterface} from "../../pages/api/teaser/[type]/[slug]";

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
    close: Function;
}

export interface TeaserStateInterface extends TeaserInterface{
    apiUrl:string,
}

const teaserService = async (apiUrl, close):Promise<TeaserStateInterface> => {

    const promise = new Promise<TeaserStateInterface>((resolve, reject) => {

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {

                    const state:TeaserStateInterface = {
                        apiUrl: apiUrl,
                        image: result.image,
                        title: result.title,
                        subLine: result.subLine,
                        href: result.href,
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
/*
*/

export const Teaser = (props: TeaserPropsInterface) => {

    const classes = useStyles();

    const visible = (undefined === props.apiUrl) ? false: true;

    const [data, setData] = useState<TeaserStateInterface>(undefined);

    const [loading, setLoading] = useState<boolean>(true);

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

    const handleClose = () => {
        setLoading(true);
        props.close();
    };

    return (
        <Card
            className={classes.root}
            elevation={2}
        >
            <div className={classes.text}>
                <CardContent>

                    <Typography component="h6" variant="h6">
                        {data.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {data.subLine}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        href={data.href}
                    >
                        Details
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleClose}
                    >
                        Schließen
                    </Button>
                </CardActions>
            </div>
            <CardMedia
                className={classes.image}
                image={data.image}
                title={data.title}
            />
        </Card>
    );
}
