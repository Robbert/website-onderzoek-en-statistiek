/* eslint-disable no-param-reassign */

'use strict';

const {
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
    const { slug } = item.params.data;
    token = await getToken();
    const datasetDcat = transformDataset(item.params.data);
    const result = await createDataset(datasetDcat, slug, token);
    if (result.statusCode !== 201) {
      throw strapi.errors.badRequest('Failed to create dataset in data catalog!');
    }
    item.params.data.dcat_identifier = getIdentifier(result.headers.location);
  },
  async afterUpdate(item) {
    token = await getToken();
    const { dcat_identifier: id, slug } = item.result;
    const etag = await getETag(id, slug, token);
    const datasetDcat = transformDataset(item.result);
    const result = await updateDataset(id, etag, datasetDcat, slug, token);
    if (result.statusCode !== 201 && result.statusCode !== 204) {
      throw strapi.errors.badRequest('Failed to update dataset in data catalog!');
    }
  },
  async afterDelete(item) {
    token = await getToken();
    const { dcat_identifier: id, slug } = item.result;
    const etag = await getETag(id, slug, token);
    const result = await deleteDataset(id, etag, slug, token);
    if (result.statusCode !== 204) {
      throw strapi.errors.badRequest('Failed to delete dataset in data catalog!');
    }
  },
};
