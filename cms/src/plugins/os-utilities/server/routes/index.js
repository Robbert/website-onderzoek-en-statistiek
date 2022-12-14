module.exports = [
  {
    method: 'POST',
    path: '/download',
    handler: 'utilities.downloadMedia',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/export',
    handler: 'utilities.exportDatabase',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/import',
    handler: 'utilities.importDatabase',
    config: {
      policies: [],
    },
  },
];
