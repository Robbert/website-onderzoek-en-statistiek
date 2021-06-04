'use strict';
const utils  = require('../../../lib/utils');

module.exports = {
    lifecycles: {
        async beforeCreate(item) {
            if (item.origin && item.origin === 'drupal'){
            item = await utils.parseContentFromDrupal('publication', item);
            }
        },
    },
};