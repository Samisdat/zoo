import React from 'react';
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ValidatorForm} from "react-material-ui-form-validator";

/**
 * @TODO Migrate to function style
 */
export default class GeoJsonEditor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            name: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({name: event.target.value});

    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({ submitted: true }, async () => {

            const response = await fetch('/api/geojson/new', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state),
            });

            if (response.ok) { // if HTTP-status is 200-299
                // get the response body (the method explained below)
                let json = await response.json();
                console.log('json', json);
                this.setState({ submitted: false });
            } else {
                console.log("HTTP-Error: " + response.status);
            }

        });

    }

    render() {

        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1>Neues GeoJson Object anlegen</h1>
                </Grid>
                <Grid item xs={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <TextField
                                name="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={this.state.submitted}
                            >
                                {
                                    (this.state.submitted && 'Your form is submitted!')
                                    || (!this.state.submitted && 'Submit')
                                }
                            </Button>
                        </FormGroup>
                    </form>
                </Grid>
                <Grid item xs={8}>
                    {/*
                    <Map
                        center={position}
                        zoom={this.state.zoom}
                        maxZoom="20"
                        style={{width:"700px", height:"400px"}}
                        onMoveend={this.handleMoveend}
                        onZoomend={this.handleZoomend}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {this.props.polygons.map((polygon) => (
                            <Polyline color={polygon.color} positions={polygon.coordinate} onClick={this.onClick}>
                                <Tooltip sticky>{polygon.name}</Tooltip>
                            </Polyline>
                        ))}

                        {this.props.polygons.map((polygon) => (
                            polygon.coordinate.map((coordinate, index) => (
                                <Marker data-osmid={coordinate.osmId} position={coordinate} onClick={this.onMarkerClick}></Marker>

                            ))
                        ))}
                    </Map>*/}
                </Grid>
            </Grid>
        );
    }
}
