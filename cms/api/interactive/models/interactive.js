/* eslint-disable no-param-reassign */

'use strict';

const utils = require('../../../lib/utils');

module.exports = {
  lifecycles: {
    async beforeCreate(item) {
      if (item.origin === 'drupal') {
        item = await utils.parseContentFromDrupal('interactive', item);
      }
    },
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
