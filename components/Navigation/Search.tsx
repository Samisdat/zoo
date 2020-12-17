import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import fetch from 'cross-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TemporaryDrawer(props) {

    const classes = useStyles();

    const {toggleSearch} = props;

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

            const response0 = await fetch('http://127.0.0.1:8080/api/search/autocomplete');

            const results = await response0.json();

            if (active) {
                setOptions(results);
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

        if(undefined === event.target.value){
            return;
        }

        const selected = options[event.target.value];


    }

    return (

        <SwipeableDrawer
            anchor='top'
            open={props.openSearch}
            onClose={toggleSearch}
            onOpen={toggleSearch}
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
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
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

        </SwipeableDrawer>
        
    );
}
