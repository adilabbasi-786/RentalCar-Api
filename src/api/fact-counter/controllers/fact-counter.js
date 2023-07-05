'use strict';

/**
 * fact-counter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fact-counter.fact-counter');
