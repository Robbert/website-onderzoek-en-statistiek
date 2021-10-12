'use strict';

const utils = require('../../../lib/utils');

module.exports = {
  lifecycles: {
    async afterPublish() {
      utils.rebuildSearchContent();
    },
    async afterUpdate() {
      utils.rebuildSearchContent();
    },
    async afterDelete() {
      utils.rebuildSearchContent();
    },
  },
};
