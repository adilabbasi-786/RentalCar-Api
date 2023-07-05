'use strict';

/**
 * fact-counter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fact-counter.fact-counter');
