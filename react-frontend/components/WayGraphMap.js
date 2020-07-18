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
import {Map, Marker, Polyline, Popup, TileLayer, Tooltip} from "react-leaflet";
import {ValidatorForm} from "react-material-ui-form-validator";

export default class WayEditor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            lat: localStorage.getItem('lat') || 51.23925648995369,
            lng: localStorage.getItem('lng') || 7.110623781506344,
            zoom: localStorage.getItem('zoom') || 20,
        };

    }

    handleMoveend = (event) => {

        const { lat, lng } = event.target.getCenter()

        this.setState({
            lat: lat,
            lng: lng
        });

        localStorage.setItem('lat', lat);
        localStorage.setItem('lng', lng);

    };

    handleZoomend = (event) => {

        this.setState({
            zoom: event.target._zoom
        });

        localStorage.setItem('zoom', event.target._zoom);

    };

    render() {

        const position = [this.state.lat, this.state.lng];

        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1>Karte</h1>
                </Grid>
                <Grid item xs={12}>
                    <Map
                        center={position}
                        zoom={this.state.zoom}
                        maxZoom="20"
                        style={{width:"800px", height:"600px"}}
                        onMoveend={this.handleMoveend}
                        onZoomend={this.handleZoomend}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {this.props.edges.map((edge) => (
                            <Polyline color="black" positions={edge.coordinate}></Polyline>
                        ))}

                        {this.props.nodes.map((node) => (
                            <Marker data-osmid={node.osmId} position={node.coordinate}>
                                <Popup>
                                    {node.name}
                                </Popup>
                            </Marker>
                        ))}
                    </Map>
                </Grid>
            </Grid>
        );
    }
}
