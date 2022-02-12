import React, {useEffect} from 'react';
import * as d3 from "d3";

/**
 * For obvious reasons not all areas of the zoo can be entered.
 * combined.svg contains edges in the middle of all ways
 *
 * So if I get a new (potentially inaccurate) GeoPosition,
 * I can use it to determine where the visitor might be:
 *
 * 1) Transform an gps position into cartesian coordinates in the SVG reference system
 * 2) Sample all edges to find closest  points on every edge
 * 3) Take 40 closest points, calculate their variance
 *    and throw away any points that are farther away then variance from current position then the closest points
 * 4) I end up with some (in best case only one) edges and a position on theses edges
 * 5) If more then one edge is resolved, I assume that the very closest point is the right one, but I store the least closest point as fuzziness
 *
 */
export const ResolvePosition = () => {

    useEffect(() => {

        const edges = d3.selectAll('.edge').nodes();

        // console.log(edges)

    });

    return (
        <React.Fragment>
        </React.Fragment>
    );

}
