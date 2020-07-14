import React, { Component, createRef } from 'react';

import { Map, TileLayer, Marker, Popup,Polyline, Tooltip } from 'react-leaflet'


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

    render() {
        const position = [this.state.lat, this.state.lng]

        return (
            <Map
                center={position}
                zoom={this.state.zoom}
                style={{height:"700px"}}
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

            </Map>
        )
    }
}