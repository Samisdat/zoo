import React from 'react';

export default function Endanger({iucnStatus}) {
    
    return (
        <React.Fragment>
            <div>Bedrohung</div>
            <div>{iucnStatus}</div>
        </React.Fragment>
    );
}
