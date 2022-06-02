module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      enabled: true,
      multipart: true,
      textLimit: '500mb',
      formLimit: '500mb',
      jsonLimit: '500mb',
      formidable: {
        maxFileSize: 524288000,
      },
    },
  },
  'global::flatten-response',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
