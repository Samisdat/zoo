import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Feature} from "geojson";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChipsArray from "./Chips";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            backgroundColor: 'red',
            overflowX: 'auto',
            width:'100%',
            height:40,
            flexWrap: 'nowrap',
            '& > *': {
            margin: theme.spacing(0.5),
    },
        },
    }),
);

export const MapSearch = (props) => {

    const classes = useStyles();

    const {toggleSearch, setFocus} = props;

    const options = props.geoJson.features.filter((feature:Feature) => {

        if('facility-box' === feature.properties?.type){
            return true;
        }

        return false;

    });

    const onChange = (event) => {

        if(! event.target){
            return;
        }

        const index = event.target.getAttribute('data-option-index');

        if(null === index){
            setFocus('none');
            return;
        }

        const selected = options[index];

        if(undefined === selected){
            return;
        }

        setFocus(selected)

    }

    const groupBy = (option) => {
        return option.properties.name[0].toUpperCase();
    }

    const getOptionLabel = (option) => {
        return option.properties.name;
    }

    const renderInput = (params) => {
        return (
            <TextField
                {...params}
                size="small"
                label="Suche"
                variant="outlined"
            />
        );
    }

    return (

        <Drawer
            anchor='top'
            //open={props.openSearch}
            open={true}
            onClose={toggleSearch}
            variant='persistent'
        >

            <Autocomplete
                style={{ margin: 10   }}
                options={options}
                groupBy={groupBy}
                getOptionLabel={getOptionLabel}
                renderInput={renderInput}
                onChange={onChange}
                clearOnBlur
            />
            <div className={classes.root}>
                <ChipsArray/>
            </div>

        </Drawer>

    );
}