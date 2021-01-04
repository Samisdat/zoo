import React, {MouseEventHandler} from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

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
    href: string;
    title: string;
    subLine?: string;
    image: string;
    close: React.MouseEventHandler<HTMLButtonElement>;
}

export const Teaser = (props: TeaserPropsInterface) => {

    console.log(props);

    const classes = useStyles();

    return (
    <Card
        className={classes.root}
        elevation={2}
    >
        <div className={classes.text}>
            <CardContent>
                <Typography component="h6" variant="h6">
                    {props.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {props.subLine}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    href={props.href}
                >
                    Details
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={props.close}
                >
                    Schließen
                </Button>
            </CardActions>
        </div>
        <CardMedia
            className={classes.image}
            image={props.image}
            title={props.title}
        />
    </Card>

    );
}
