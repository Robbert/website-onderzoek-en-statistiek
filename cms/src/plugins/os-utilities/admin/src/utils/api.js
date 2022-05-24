/* eslint-disable import/no-extraneous-dependencies */

import { request } from '@strapi/helper-plugin';
import pluginId from '../pluginId';

export const downloadMedia = () => request(`/${pluginId}/download`, {
  method: 'POST',
});

export const exportDatabase = () => request(`/${pluginId}/export`, {
  method: 'POST',
});

export const importDatabase = (sql) => request(`/${pluginId}/import`, {
  method: 'POST',
  body: {
    sql,
  },
});
