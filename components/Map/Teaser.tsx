import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            position: 'absolute'    ,
            bottom:90,
            left: theme.spacing(1),
            right: theme.spacing(1),
            flexDirection: 'row'
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

        },1000);

    });

    return promise

}
/*
*/

export const Teaser = (props: TeaserPropsInterface) => {

    console.log(props);

    const classes = useStyles();

    const [teaser, setTeaser] = useState<TeaserStateInterface>(undefined);

    useEffect(() => {

        teaserService(props.apiUrl, props.close)
            .then((data) =>{
                setTeaser(data);
            });

    }, [props.apiUrl])


    return (
    <Card
        className={classes.root}
        elevation={2}
    >
        <div className={classes.text}>
            <CardContent>
                <Typography component="h6" variant="h6">
                    {teaser?.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {teaser?.subLine}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    href={teaser?.href}
                >
                    Details
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={teaser?.close}
                >
                    Schließen
                </Button>
            </CardActions>
        </div>
        <CardMedia
            className={classes.image}
            image={teaser?.image}
            title={teaser?.title}
        />
    </Card>

    );
}
