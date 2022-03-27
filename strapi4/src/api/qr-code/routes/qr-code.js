'use strict';

/**
 * qr-code router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::qr-code.qr-code');
