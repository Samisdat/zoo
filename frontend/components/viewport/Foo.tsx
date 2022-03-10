import React from 'react';
import {useViewport} from './useViewport';

export default function Foo() {

    const { width, height, breakpoint } = useViewport();

    return (
        <React.Fragment>
            Foo {width} {height} {breakpoint}
        </React.Fragment>
    );
}
