'use strict';

/**
 * web-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::web-info.web-info');
