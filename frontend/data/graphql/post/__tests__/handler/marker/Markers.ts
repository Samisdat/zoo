// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../../data/marker.json');

export const Markers = (request, response, context) => {

    const markers =
        data.Markers.data;

    return response(
        context.data(markers)
    );
}