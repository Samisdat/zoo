import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useViewport} from "../viewport/useViewport";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        img:{
           width:'100%',
        }
    })
});

export const Endanger = ({iucnStatus}) => {

    const { width} = useViewport();

    const classes = useStyles();
``
    const imgName = (width > 600 ) ? `${iucnStatus}-scale.svg`: `${iucnStatus}.svg`;
    const imgPath = `/iucn/${imgName}`;
    
    return (
        <Grid
            component={'section'}
            id={'endanger'}
            item
            xs={12}
        >
            <Paper
                className={classes.paper}
                square={true}
                elevation={0}
            >
                <Typography component="h2">
                    Bedrohung<br/>
                    {width}
                </Typography>

                <img
                    className={classes.img}
                    src={imgPath}
                />
            </Paper>
        </Grid>

    );
}
