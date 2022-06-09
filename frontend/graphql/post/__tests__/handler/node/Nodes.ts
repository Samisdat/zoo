const data = require('../../data/nodes.json');

export const Nodes = (request, response, context) => {

    const nodes =
        data.Nodes.data;

    return response(
        context.data(nodes)
    );
}