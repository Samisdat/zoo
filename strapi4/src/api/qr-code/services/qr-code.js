'use strict';

/**
 * qr-code service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::qr-code.qr-code');
