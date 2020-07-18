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
            nameStart: '',
            nameEnd: '',
            steps: false,
            points:[],
            lat: localStorage.getItem('lat') || 51.23925648995369,
            lng: localStorage.getItem('lng') || 7.110623781506344,
            zoom: localStorage.getItem('zoom') || 20,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    clearForm = () => {
        this.setState({
            steps: false,
            nameStart: '',
            nameEnd: '',
            points:[],
            submitted: false
        });

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

    onMarkerClick = (event) => {

        const points = this.state.points.map((point)=>{
            return point;
        });

        const point = event.sourceTarget.options['data-osmid']

        if(true === points.includes(point)){
            return;
        }

        points.push(point);

        this.setState({points: points});

    };

    handleChange(event) {

        if('steps' === event.target.name){
            this.setState({steps: (true === this.state.steps) ? false: true});
        }
        else if('name-start' === event.target.name){
            this.setState({nameStart: event.target.value});
        }
        else if('name-end' === event.target.name){
            this.setState({nameEnd: event.target.value});
        }
        else
        {
            this.setState({value: event.target.value});
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({ submitted: true }, async () => {

            const response = await fetch('http://127.0.0.1:3000/way/save', {
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

        const position = [this.state.lat, this.state.lng];

        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1>Karte</h1>
                </Grid>
                <Grid item xs={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <TextField
                                name="name-start"
                                label="Name Start"
                                value={this.state.nameStart}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <TextField
                                name="name-end"
                                label="Name End"
                                value={this.state.nameEnd}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="steps"
                                        checked={this.state.steps}
                                        onChange={this.handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label="Treppen"
                            />
                        </FormGroup>
                        <Grid item xs={4}>
                            <List>
                                {this.state.points.map((point) => (
                                    <ListItem>
                                        <ListItemText
                                            primary={point}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
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
                        <FormGroup row style={{marginBottom:'10px'}}>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={this.clearForm}
                            >
                                Clear
                            </Button>

                        </FormGroup>
                    </form>
                </Grid>
                <Grid item xs={8}>
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
                    </Map>
                </Grid>
            </Grid>
        );
    }
}
