import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetch from 'cross-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

export function MapSearch(props) {

    const {toggleSearch, setFocus} = props;

    const onClick = () => {
        toggleSearch();
    }

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {

            const response = await fetch('http://127.0.0.1:8080/api/search/autocomplete');

            const results = await response.json();

            const complete = results.map((result)=>{
                return result.feature;
            });
            
            if (active) {
                setOptions(complete);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const onChange = (event) => {

        if(! event.target){
            return;
        }

        const index = event.target.getAttribute('data-option-index');

        const selected = options[index];

        if(undefined === selected){
            return;
        }

        setFocus(selected)

    }

    return (

        <Drawer
            anchor='top'
            open={props.openSearch}
            onClose={toggleSearch}
            variant='persistent'
        >
            <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={
                    (option, value) => {
                        return option.properties.name === value.name
                    }
                }
                getOptionLabel={
                    (option) => {
                        return option.properties.name
                    }
                }
                options={options}
                loading={loading}
                onChange={onChange}
                freeSolo
                style={{ width: 300, margin: 20   }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Suche"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />

        </Drawer>
        
    );
}
