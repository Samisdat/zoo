import React from 'react';
import GeoJsonEditor from '../../components/GeoJsonEditor'

export default function List(props) {

    return (
        <div>
            <h1>Neues GeoJSon</h1>
            <GeoJsonEditor {...props}></GeoJsonEditor>
        </div>

    );
}
