'use strict';

/**
 * graph-node router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::graph-node.graph-node');
