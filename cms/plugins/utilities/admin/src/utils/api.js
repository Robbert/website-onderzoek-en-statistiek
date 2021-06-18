import { request } from 'strapi-helper-plugin';
import pluginId from '../pluginId';

export const exportDatabase = () => {
  return request(`/${pluginId}/export`, {
    method: 'POST'
  });
};

export const importDatabase = (sql) => {
  return request(`/${pluginId}/import`, {
    method: 'POST',
    body: {
      sql,
    },
  });
};