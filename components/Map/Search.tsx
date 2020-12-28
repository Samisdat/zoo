import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const MapSearch = (props) => {

    const {toggleSearch, setFocus} = props;

    const onChange = (event) => {

        if(! event.target){
            return;
        }

        const index = event.target.getAttribute('data-option-index');

        if(null === index){
            setFocus('none');
            return;
        }

        const selected = props.zoomBoxes[index].feature;

        if(undefined === selected){
            return;
        }

        setFocus(selected)

    }

    const groupBy = (option) => {
        return option.feature.properties.name[0].toUpperCase();
    }

    const getOptionLabel = (option) => {
        return option.feature.properties.name;
    }

    const renderInput = (params) => {
        return (
            <TextField {...params} label="Suche" variant="outlined" />
        );
    }

    return (

        <Drawer
            anchor='top'
            open={props.openSearch}
            onClose={toggleSearch}
            variant='persistent'
        >

            <Autocomplete
                style={{ width: 300, margin: 10   }}
                options={props.zoomBoxes}
                groupBy={groupBy}
                getOptionLabel={getOptionLabel}
                renderInput={renderInput}
                onChange={onChange}
                clearOnBlur
            />

        </Drawer>
        
    );
}