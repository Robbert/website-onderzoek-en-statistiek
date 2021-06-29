'use strict';
const utils  = require('../../../lib/utils');

module.exports = {
    lifecycles: {
        async beforeCreate(item) {
          if (item.origin === 'drupal'){
            item = await utils.parseContentFromDrupal('video', item);
          }
      },
    },
};