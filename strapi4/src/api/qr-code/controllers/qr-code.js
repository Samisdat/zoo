'use strict';

/**
 *  qr-code controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::qr-code.qr-code');
