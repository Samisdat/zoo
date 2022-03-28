'use strict';

/**
 * individual-animal service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::individual-animal.individual-animal');
