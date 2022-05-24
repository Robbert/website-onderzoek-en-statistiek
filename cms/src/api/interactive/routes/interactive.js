'use strict';

/**
 * interactive router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::interactive.interactive');
