/* eslint-disable no-param-reassign */

'use strict';

const utils = require('../../../lib/utils');

const {
  getToken,
  getETag,
  getIdentifier,
  updateDataset,
  createDataset,
  deleteDataset,
  transformDataset,
} = require('../../../lib/datacatalog');

let token;

module.exports = {
  lifecycles: {
    async beforeCreate(item) {
      const { origin, slug } = item;
      if (origin === 'dcat') {
        item = await utils.parseContentFromDcat(item);
      } else {
        token = await getToken();
        const datasetDcat = transformDataset(item);
        const result = await createDataset(datasetDcat, slug, token);
        if (result.statusCode !== 201) {
          throw strapi.errors.badRequest('Failed to create dataset in data catalog!');
        }
        item.dcat_identifier = getIdentifier(result.headers.location);
      }
    },
    async afterPublish() {
      utils.rebuildSearchContent();
    },
    async afterUpdate(item) {
      token = await getToken();
      const { dcat_identifier: id, slug } = item;
      const etag = await getETag(item.dcat_identifier, slug);
      const datasetDcat = transformDataset(item);
      const result = await updateDataset(id, etag, datasetDcat, slug, token);
      if (result.statusCode !== 201 && result.statusCode !== 204) {
        throw strapi.errors.badRequest('Failed to update dataset in data catalog!');
      }
      utils.rebuildSearchContent();
    },
    async afterDelete(item) {
      token = await getToken();
      const { dcat_identifier: id, slug } = item;
      const etag = await getETag(id, slug);
      const result = await deleteDataset(id, etag, slug, token);
      if (result.statusCode !== 204) {
        throw strapi.errors.badRequest('Failed to delete dataset in data catalog!');
      }
      utils.rebuildSearchContent();
    },
  },
};
