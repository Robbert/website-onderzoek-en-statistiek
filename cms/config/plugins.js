module.exports = () => ({
  upload: {
    enabled: true,
    config: {
      providerOptions: {
        localServer: {
          maxage: 604800 * 1000, // 604800 = week, 31536000 = year
        },
      },
    },
  },
  'os-utilities': {
    enabled: true,
    resolve: './src/plugins/os-utilities',
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::homepage.homepage',
        },
        {
          uid: 'api::article.article',
          targetField: 'slug',
          published: {
            basePath: 'artikel',
          },
          draft: {
            query: {
              type: 'article',
            },
          },
        },
        {
          uid: 'api::collection.collection',
          targetField: 'slug',
          published: {
            basePath: 'dossier',
          },
          draft: {
            query: {
              type: 'collection',
            },
          },
        },
        {
          uid: 'api::dataset.dataset',
          targetField: 'slug',
          published: {
            basePath: 'dataset',
          },
          draft: {
            query: {
              type: 'dataset',
            },
          },
        },
        {
          uid: 'api::interactive.interactive',
          targetField: 'slug',
          published: {
            basePath: 'interactief',
          },
          draft: {
            query: {
              type: 'interactive',
            },
          },
        },
        {
          uid: 'api::publication.publication',
          targetField: 'slug',
          published: {
            basePath: 'publicatie',
          },
          draft: {
            query: {
              type: 'publication',
            },
          },
        },
        {
          uid: 'api::theme.theme',
          targetField: 'slug',
          published: {
            basePath: 'thema',
          },
          draft: {
            query: {
              type: 'theme',
            },
          },
        },
        {
          uid: 'api::video.video',
          targetField: 'slug',
          published: {
            basePath: 'video',
          },
          draft: {
            query: {
              type: 'video',
            },
          },
        },
      ],
    },
  },
});
