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
            startPoint: undefined,
            endPoint: undefined,
            shortestRoute:undefined
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);

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

    onMarkerClick = async (event) => {

        const point = event.sourceTarget.options['data-mongodbid'];

        if(undefined === this.state.startPoint){
            this.setState({'startPoint': point});
        }
        else if(undefined === this.state.endPoint){
            this.setState({'endPoint': point});
        }

        if(undefined === this.state.startPoint || undefined === this.state.endPoint){
            return;
        }

        const url = `http://127.0.1:3000/way/shortest/${this.state.startPoint}/${this.state.endPoint}`;

        const response = await fetch(url);
        const json = await response.json();
        const edges = json.edges;

        this.setState({'shortestRoute': edges});
        this.setState({'startPoint': undefined});
        this.setState({'endPoint': undefined});

    };


    render() {

        const position = [this.state.lat, this.state.lng];

        let edges = this.props.edges;

        if(undefined !== this.state.shortestRoute){

            for(const edge of edges){
                edge.color = 'black';

                for(const partOfShortestRoute of this.state.shortestRoute){
                    
                    if(edge.id === partOfShortestRoute._id){
                        edge.color = 'red';
                    }

                }

            }

            //console.log(this.state.shortestRoute);
            //http://127.0.0.1:3000/way/shortest/5f119eb259c98e1230b957e0/5f11aa6ac3cfb2123dc16680
        }
        else{

            for(const edge of edges){
                edge.color = 'black';
            }

        }

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

                        {edges.map((edge) => (
                            <Polyline color={edge.color} positions={edge.coordinate}></Polyline>
                        ))}

                        {this.props.nodes.map((node) => (
                            <Marker data-osmid={node.coordinate.osmId} data-mongodbid={node.id} position={node.coordinate} onClick={this.onMarkerClick}>
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
