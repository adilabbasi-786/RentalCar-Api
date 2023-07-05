'use strict';

/**
 * fact-counter router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fact-counter.fact-counter');
