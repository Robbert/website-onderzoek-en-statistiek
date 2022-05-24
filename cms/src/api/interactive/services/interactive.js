'use strict';

/**
 * interactive service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::interactive.interactive');
