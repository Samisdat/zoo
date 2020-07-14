import React, { Component, createRef } from 'react';

import { Map, TileLayer, Marker, Popup,Polyline } from 'react-leaflet'

export default class SimpleExample extends Component {
    state = {
        lat: 51.23925648995369,
        lng: 7.11062378150634421,
        zoom: 17,
    }


    render() {
        const position = [this.state.lat, this.state.lng]

        return (
            <Map center={position} zoom={this.state.zoom} style={{
                height:"700px"
            }}>>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {this.props.polygons.map((polygon) => (
                    <Polyline color={polygon.color} positions={polygon.coordinate} />
                ))}

            </Map>
        )
    }
}