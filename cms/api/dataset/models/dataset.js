'use strict';
const utils  = require('../../../lib/utils');

module.exports = {
    lifecycles: {
        async beforeCreate(item) {
            if (item.origin === 'dcat'){
            item = await utils.parseContentFromDcat(item);
            }
        },
    },
};
