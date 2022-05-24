/* eslint-disable no-param-reassign */

'use strict';

const {
  config,
  getToken,
  getETag,
  getIdentifier,
  updateDataset,
  createDataset,
  deleteDataset,
  transformDataset,
} = require('../../../../../lib/datacatalog');

let token;

module.exports = {
  async beforeCreate(item) {
    const { slug } = item;
    if (config.environment !== 'local') {
      token = await getToken();
      const datasetDcat = transformDataset(item);
      const result = await createDataset(datasetDcat, slug, token);
      if (result.statusCode !== 201) {
        throw strapi.errors.badRequest('Failed to create dataset in data catalog!');
      }
      item.dcat_identifier = getIdentifier(result.headers.location);
    }
  },
  async afterUpdate(item) {
    if (config.environment !== 'local') {
      token = await getToken();
      const { dcat_identifier: id, slug } = item;
      const etag = await getETag(item.dcat_identifier, slug);
      const datasetDcat = transformDataset(item);
      const result = await updateDataset(id, etag, datasetDcat, slug, token);
      if (result.statusCode !== 201 && result.statusCode !== 204) {
        throw strapi.errors.badRequest('Failed to update dataset in data catalog!');
      }
    }
  },
  async afterDelete(item) {
    if (config.environment !== 'local') {
      token = await getToken();
      const { dcat_identifier: id, slug } = item;
      const etag = await getETag(id, slug);
      const result = await deleteDataset(id, etag, slug, token);
      if (result.statusCode !== 204) {
        throw strapi.errors.badRequest('Failed to delete dataset in data catalog!');
      }
    }
  },
};
