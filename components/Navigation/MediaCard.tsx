import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
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
            height: '150px',
            marginBottom: '90px'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }),
);

export default function MediaControlCard(props) {
    const classes = useStyles();

    return (
        <Card
            className={classes.root}
            elevation={0}
        >
            <CardMedia
                className={classes.cover}
                image="/images/elefant.jpg"
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Details
                    </Button>
                    <Button size="small" color="primary" onClick={props.toggleTeaser}>
                        Schließen
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}
