const data = require('../../data/edges.json');

export const Edges = (request, response, context) => {

    const edges =
        data.Edges.data;

    return response(
        context.data(edges)
    );
}