import React, { Component, createRef } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Map, TileLayer, Marker, Popup,Polyline, Tooltip } from 'react-leaflet'
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

const customList = (items) => {

    const classes = useStyles();

    return (
    <Paper className={classes.paper}>
        <List dense component="div" role="list">
            {items.map((value) => {
                const labelId = `transfer-list-item-${value}-label`;

                return (
                    <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    </Paper>)
};

export default class WayMap extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            lat: localStorage.getItem('lat') || 51.23925648995369,
            lng: localStorage.getItem('lng') || 7.110623781506344,
            zoom: localStorage.getItem('zoom') || 18
        }

    }

    onClick = () => {
        console.log('onClick');
    };

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

    handleClick = (event) => {

        console.log(event.latlng)

        document.getElementById('dump').innerHTML = document.getElementById('dump').innerHTML += JSON.stringify(event.latlng);

    };

    clear = (event) => {

        document.getElementById('dump').innerHTML = '';

    };


    render() {
        const position = [this.state.lat, this.state.lng]

        const items = [
            0,
            1,
            2,
            3,
            4,
            5
        ]


        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1>Karte</h1>
                </Grid>
                <Grid item xs={6}>
                    <div id="dump"
                         style={{width:"400px", height:"400px", border: "1px solid red", float:'left'}}
                    ></div>

                    <button onClick={this.clear}>Leeren</button>
                </Grid>
                <Grid item xs={6}>
                    <Map
                        center={position}
                        zoom={this.state.zoom}
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
                                <Marker position={coordinate} onClick={this.handleClick}>
                                    <Popup>{polygon.osmId}<br /> {index}</Popup>
                                </Marker>

                            ))
                        ))}


                    </Map>
                </Grid>
            </Grid>
        )
    }
}