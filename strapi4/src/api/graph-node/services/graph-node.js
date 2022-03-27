'use strict';

/**
 * graph-node service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::graph-node.graph-node');
